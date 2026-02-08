import { REST, Routes } from 'discord.js';
import config from './config.js';
import mambotCommand from './commands/mambot.js';
import joinCommand from './commands/join.js';
import leaveCommand from './commands/leave.js';

const commands = [
  joinCommand.data.toJSON(),
  leaveCommand.data.toJSON(),
  mambotCommand.data.toJSON(),
];

const rest = new REST().setToken(config.token);

// Deploy commands globally
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // Register commands globally (available in all servers)
    const data = await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: commands },
    );

    console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error('Error deploying commands:', error);
  }
})();
