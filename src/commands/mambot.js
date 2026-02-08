import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import { getAudioFileFromCategory, playAudioFile } from '../utils/audioPlayer.js';

export default {
  data: new SlashCommandBuilder()
    .setName('mambot')
    .setDescription('Play a specific sound category')
    .addStringOption(option =>
      option
        .setName('sound')
        .setDescription('The sound category to play')
        .setRequired(true)
        .addChoices(
          { name: 'Mambo', value: 'mambo' },
          { name: 'Weii', value: 'weii' }
        )
    ),
  
  async execute(interaction) {
    const soundCategory = interaction.options.getString('sound');
    
    // Get the voice connection for this guild
    const connection = getVoiceConnection(interaction.guildId);
    
    if (!connection) {
      await interaction.reply({
        content: '❌ I\'m not in a voice channel! Use `/join` first.',
        ephemeral: true,
      });
      return;
    }
    
    // Get audio file from the specified category
    const audioFile = getAudioFileFromCategory(soundCategory);
    
    if (!audioFile) {
      await interaction.reply({
        content: `❌ No audio files found for category: ${soundCategory}`,
        ephemeral: true,
      });
      return;
    }
    
    // Reply immediately
    await interaction.reply({
      content: `🎵 Playing ${soundCategory} sound!`,
      ephemeral: true,
    });
    
    // Play the audio
    try {
      await playAudioFile(connection, audioFile);
    } catch (error) {
      console.error('Error playing sound:', error);
      await interaction.followUp({
        content: '❌ Error playing the sound!',
        ephemeral: true,
      });
    }
  },
};
