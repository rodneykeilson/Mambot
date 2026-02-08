import 'dotenv/config';

export default {
  // Discord Bot Token
  token: process.env.DISCORD_TOKEN,
  
  // Discord Client ID (Application ID)
  clientId: process.env.CLIENT_ID,
  
  // Random play interval in milliseconds (30-60 minutes)
  minInterval: 30 * 60 * 1000, // 30 minutes
  maxInterval: 60 * 60 * 1000, // 60 minutes
  
  // Audio files path
  audioPath: './assets/audio/umamusume'
};
