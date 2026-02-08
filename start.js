import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting Mambot...');

// First, try to deploy commands (but don't fail if it errors)
console.log('📝 Deploying slash commands...');

const deployCommands = spawn('node', [join(__dirname, 'src', 'deploy-commands.js')], {
  stdio: 'inherit',
  shell: true
});

deployCommands.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Commands deployed successfully');
  } else {
    console.log('⚠️  Command deployment failed (this is ok on first run)');
  }
  
  // Start the bot regardless of deployment result
  console.log('🤖 Starting bot...');
  const bot = spawn('node', [join(__dirname, 'src', 'index.js')], {
    stdio: 'inherit',
    shell: true
  });
  
  bot.on('close', (botCode) => {
    console.error(`❌ Bot process exited with code ${botCode}`);
    process.exit(botCode);
  });
  
  bot.on('error', (err) => {
    console.error('❌ Failed to start bot:', err);
    process.exit(1);
  });
});

deployCommands.on('error', (err) => {
  console.error('⚠️  Failed to deploy commands:', err);
  console.log('🤖 Starting bot anyway...');
  
  const bot = spawn('node', [join(__dirname, 'src', 'index.js')], {
    stdio: 'inherit',
    shell: true
  });
  
  bot.on('close', (botCode) => {
    console.error(`❌ Bot process exited with code ${botCode}`);
    process.exit(botCode);
  });
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});
