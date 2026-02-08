# Mambot 🎵

A Discord bot that plays random UmaMusume sounds in voice channels at random intervals and supports soundboard commands.

## Features

- 🎤 Join any voice channel with `/join` command
- 🎲 Plays random sounds every 30-60 minutes while in voice
- 🎹 Slash command soundboard (`/mambot <sound>`)
- 👋 Leave voice channel with `/leave` command
- 🔄 Auto-reconnects if disconnected
- 🐳 Docker support for easy deployment

## Sound Categories

- **Mambo** - 3 sounds
- **Weii** - 1 sound

## Quick Start

1. **Invite the bot** to your Discord server
2. **Join a voice channel** 
3. **Use `/join`** - Bot joins your voice channel
4. **Use `/mambot mambo`** or `/mambot weii` - Play sounds on demand
5. **Use `/leave`** - Bot leaves the voice channel

## Commands

- `/join` - Bot joins your current voice channel and starts playing random sounds
- `/leave` - Bot leaves the voice channel
- `/mambot mambo` - Play a random mambo sound
- `/mambot weii` - Play the weii sound

## Setup & Deployment

See [Quick Setup Checklist](SETUP_CHECKLIST.md) or the complete [Deployment Guide](private-documentations/deployment-guide.md).

## Requirements

- Node.js 18+ (or Docker)
- Discord Bot Token
- Discord Application ID

No need to configure server IDs or channel IDs - the bot works dynamically!

## License

MIT
