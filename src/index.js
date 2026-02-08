import { Client, GatewayIntentBits, Collection, Events } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import config from './config.js';
import { scheduleNextSound } from './utils/audioPlayer.js';
import mambotCommand from './commands/mambot.js';
import joinCommand from './commands/join.js';
import leaveCommand from './commands/leave.js';

// Create Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});

// Store commands
client.commands = new Collection();
client.commands.set(joinCommand.data.name, joinCommand);
client.commands.set(leaveCommand.data.name, leaveCommand);
client.commands.set(mambotCommand.data.name, mambotCommand);

// Store active voice connections
client.activeVoiceConnections = new Map();

// Bot ready event
client.once(Events.ClientReady, async (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
  console.log(`📋 Bot is ready! Use /join in a voice channel to get started.`);
  console.log(`🎵 Available in ${c.guilds.cache.size} server(s)`);
});

// Handle slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = client.commands.get(interaction.commandName);
  
  if (!command) return;
  
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('Error executing command:', error);
    const errorMessage = { content: 'There was an error executing this command!', ephemeral: true };
    
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Handle voice state updates (rejoin if disconnected)
client.on(Events.VoiceStateUpdate, (oldState, newState) => {
  // If bot was disconnected from voice channel
  if (oldState.member?.id === client.user.id && !newState.channelId) {
    const guildId = oldState.guild.id;
    const connectionInfo = client.activeVoiceConnections.get(guildId);
    
    if (connectionInfo) {
      console.log(`⚠️ Bot was disconnected from voice channel in ${oldState.guild.name}, attempting to rejoin...`);
      
      setTimeout(async () => {
        try {
          const guild = await client.guilds.fetch(guildId);
          const voiceChannel = await guild.channels.fetch(connectionInfo.channelId);
          
          if (voiceChannel) {
            const { joinVoiceChannel } = await import('@discordjs/voice');
            const connection = joinVoiceChannel({
              channelId: voiceChannel.id,
              guildId: guild.id,
              adapterCreator: guild.voiceAdapterCreator,
            });
            
            connectionInfo.connection = connection;
            console.log(`✅ Rejoined voice channel: ${voiceChannel.name}`);
            scheduleNextSound(connection);
          }
        } catch (error) {
          console.error('❌ Error rejoining voice channel:', error);
          client.activeVoiceConnections.delete(guildId);
        }
      }, 5000); // Wait 5 seconds before rejoining
    }
  }
});

// Error handling
client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(config.token);
