import { createReadStream, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import config from '../config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get all audio files from a category
function getAudioFiles(category) {
  const categoryPath = join(__dirname, '../../assets/audio/umamusume', category);
  try {
    const files = readdirSync(categoryPath).filter(file => file.endsWith('.mp3'));
    return files.map(file => join(categoryPath, file));
  } catch (error) {
    console.error(`Error reading audio files from ${category}:`, error);
    return [];
  }
}

// Get all audio files from all categories
function getAllAudioFiles() {
  const categories = ['mambo', 'weii'];
  const allFiles = [];
  
  categories.forEach(category => {
    const files = getAudioFiles(category);
    allFiles.push(...files);
  });
  
  return allFiles;
}

// Get random audio file
function getRandomAudioFile() {
  const allFiles = getAllAudioFiles();
  if (allFiles.length === 0) {
    console.error('No audio files found!');
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * allFiles.length);
  return allFiles[randomIndex];
}

// Get random audio file from specific category
export function getAudioFileFromCategory(category) {
  const files = getAudioFiles(category);
  if (files.length === 0) {
    console.error(`No audio files found in category: ${category}`);
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * files.length);
  return files[randomIndex];
}

// Play audio file
export function playAudioFile(connection, filePath) {
  return new Promise((resolve, reject) => {
    try {
      const player = createAudioPlayer();
      const resource = createAudioResource(createReadStream(filePath));
      
      player.play(resource);
      connection.subscribe(player);
      
      console.log(`🎵 Playing: ${filePath.split(/[\\/]/).pop()}`);
      
      player.on(AudioPlayerStatus.Idle, () => {
        resolve();
      });
      
      player.on('error', (error) => {
        console.error('Audio player error:', error);
        reject(error);
      });
      
    } catch (error) {
      console.error('Error playing audio:', error);
      reject(error);
    }
  });
}

// Play random sound
export async function playRandomSound(connection) {
  if (connection.state.status !== VoiceConnectionStatus.Ready) {
    console.log('⚠️ Voice connection not ready, skipping playback');
    return;
  }
  
  const audioFile = getRandomAudioFile();
  if (audioFile) {
    try {
      await playAudioFile(connection, audioFile);
    } catch (error) {
      console.error('Error during playback:', error);
    }
  }
}

// Get random interval between min and max
function getRandomInterval() {
  const min = config.minInterval;
  const max = config.maxInterval;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Schedule next sound playback
export function scheduleNextSound(connection) {
  const interval = getRandomInterval();
  const minutes = Math.floor(interval / 60000);
  
  console.log(`⏰ Next sound scheduled in ${minutes} minutes`);
  
  setTimeout(async () => {
    await playRandomSound(connection);
    scheduleNextSound(connection); // Schedule the next one
  }, interval);
}
