import { REST, Routes } from 'discord.js';
import config from './config.js';
import mambotCommand from './commands/mambot.js';

const commands = [
  mambotCommand.data.toJSON(),
];

const rest = new REST().setToken(config.token);

// Deploy commands
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // Register commands globally or for a specific guild
    const data = await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands },
    );

    console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error('Error deploying commands:', error);
  }
})();
