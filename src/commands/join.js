import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';
import { scheduleNextSound } from '../utils/audioPlayer.js';

export default {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Make the bot join your current voice channel'),
  
  async execute(interaction) {
    // Check if user is in a voice channel
    const member = interaction.member;
    const voiceChannel = member.voice.channel;
    
    if (!voiceChannel) {
      await interaction.reply({
        content: '❌ You need to be in a voice channel first!',
        ephemeral: true,
      });
      return;
    }
    
    // Check if bot has permissions
    const permissions = voiceChannel.permissionsFor(interaction.client.user);
    if (!permissions.has('Connect') || !permissions.has('Speak')) {
      await interaction.reply({
        content: '❌ I don\'t have permission to join or speak in that voice channel!',
        ephemeral: true,
      });
      return;
    }
    
    try {
      // Join the voice channel
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
      
      // Store guild and channel info for this connection
      if (!interaction.client.activeVoiceConnections) {
        interaction.client.activeVoiceConnections = new Map();
      }
      
      interaction.client.activeVoiceConnections.set(voiceChannel.guild.id, {
        connection,
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
      });
      
      await interaction.reply({
        content: `✅ Joined **${voiceChannel.name}**! I'll play random sounds every 30-60 minutes. Use \`/mambot\` to play sounds on demand!`,
        ephemeral: false,
      });
      
      console.log(`🔊 Joined voice channel: ${voiceChannel.name} in ${voiceChannel.guild.name}`);
      
      // Start random sound scheduler
      scheduleNextSound(connection);
      
    } catch (error) {
      console.error('Error joining voice channel:', error);
      await interaction.reply({
        content: '❌ Failed to join the voice channel!',
        ephemeral: true,
      });
    }
  },
};
