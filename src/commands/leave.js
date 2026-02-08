import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

export default {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Make the bot leave the voice channel'),
  
  async execute(interaction) {
    const guildId = interaction.guildId;
    const connection = getVoiceConnection(guildId);
    
    if (!connection) {
      await interaction.reply({
        content: '❌ I\'m not in a voice channel!',
        ephemeral: true,
      });
      return;
    }
    
    try {
      // Destroy the connection
      connection.destroy();
      
      // Remove from active connections
      if (interaction.client.activeVoiceConnections) {
        interaction.client.activeVoiceConnections.delete(guildId);
      }
      
      await interaction.reply({
        content: '👋 Left the voice channel!',
        ephemeral: false,
      });
      
      console.log(`📴 Left voice channel in ${interaction.guild.name}`);
      
    } catch (error) {
      console.error('Error leaving voice channel:', error);
      await interaction.reply({
        content: '❌ Failed to leave the voice channel!',
        ephemeral: true,
      });
    }
  },
};
