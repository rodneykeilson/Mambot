import { Client, GatewayIntentBits, Collection, Events } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';
import config from './config.js';
import { playRandomSound, scheduleNextSound } from './utils/audioPlayer.js';
import mambotCommand from './commands/mambot.js';

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
client.commands.set(mambotCommand.data.name, mambotCommand);

// Bot ready event
client.once(Events.ClientReady, async (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
  
  try {
    // Join the voice channel
    const guild = await client.guilds.fetch(config.guildId);
    const voiceChannel = await guild.channels.fetch(config.voiceChannelId);
    
    if (!voiceChannel) {
      console.error('❌ Voice channel not found!');
      return;
    }
    
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    
    console.log(`🔊 Joined voice channel: ${voiceChannel.name}`);
    
    // Start the random sound scheduler
    scheduleNextSound(connection);
    
  } catch (error) {
    console.error('❌ Error joining voice channel:', error);
  }
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
    console.log('⚠️ Bot was disconnected from voice channel, attempting to rejoin...');
    
    setTimeout(async () => {
      try {
        const guild = await client.guilds.fetch(config.guildId);
        const voiceChannel = await guild.channels.fetch(config.voiceChannelId);
        
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: guild.id,
          adapterCreator: guild.voiceAdapterCreator,
        });
        
        console.log(`✅ Rejoined voice channel: ${voiceChannel.name}`);
        scheduleNextSound(connection);
      } catch (error) {
        console.error('❌ Error rejoining voice channel:', error);
      }
    }, 5000); // Wait 5 seconds before rejoining
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
