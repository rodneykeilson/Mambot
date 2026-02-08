# Wispbyte Docker Deployment Guide

## What Changed

The bot is now **much simpler** to deploy:
- ✅ Only needs **2 environment variables** (DISCORD_TOKEN and CLIENT_ID)
- ✅ No need to hardcode server IDs or channel IDs
- ✅ Use `/join` command - bot joins your voice channel dynamically
- ✅ Works with Docker on Wispbyte

## Quick Steps

### 1. Get Your Discord Credentials

Go to https://discord.com/developers/applications

1. Create a new application (or select existing)
2. Go to **Bot** tab:
   - Click "Reset Token" and copy it → This is your `DISCORD_TOKEN`
   - Enable **Server Members Intent**
   - Enable **Message Content Intent**
3. Go to **General Information** tab:
   - Copy **Application ID** → This is your `CLIENT_ID`
4. Go to **OAuth2 > URL Generator**:
   - Select scopes: `bot`, `applications.commands`
   - Select permissions: `Connect`, `Speak`, `Send Messages`, `Use Slash Commands`
   - Copy the URL and invite the bot to your server

### 2. On Wispbyte

1. **Create Server** on wispbyte.com
2. **Connect GitHub** and select your Mambot repository
3. Wispbyte will automatically detect the **Dockerfile**
4. Select **Free tier** (512 MB RAM, 1024 MB Disk)

### 3. Set Environment Variables

In Wispbyte server settings, add these **2 environment variables**:

```
DISCORD_TOKEN = (your bot token from step 1)
CLIENT_ID = (your application ID from step 1)
```

**Important**: Click **Save**!

### 4. Deploy

Click **"Start Server"** or **"Deploy"**

### 5. Check Logs

You should see:
```
✅ Successfully reloaded 3 application (/) commands.
✅ Logged in as Mambot#XXXX
📋 Bot is ready! Use /join in a voice channel to get started.
```

## How to Use

1. **Join a voice channel** in Discord
2. **Type `/join`** - Bot joins your channel and starts playing random sounds
3. **Type `/mambot mambo`** or **`/mambot weii`** - Play specific sounds
4. **Type `/leave`** - Bot leaves the channel

## How It Connects

You asked: *"How do those two even connect?"*

Here's how:

1. **DISCORD_TOKEN** - This is like a password that proves your bot is allowed to connect to Discord. Discord uses this to know which bot is logging in.

2. **CLIENT_ID** - This identifies your application. It's used to register the slash commands (`/join`, `/mambot`, etc.) so Discord knows they belong to your bot.

3. **No need for server IDs** - The bot now works dynamically! When you type `/join`, the bot sees which server you're in and which voice channel you're in, then joins that channel automatically.

Think of it like this:
- **DISCORD_TOKEN** = Your bot's login credentials
- **CLIENT_ID** = Your bot's identity card  
- **Commands** = You tell the bot what to do in real-time

## Troubleshooting

### Exit Code 128
- Check that both environment variables are set in Wispbyte
- Make sure the DISCORD_TOKEN is correct (no spaces)
- Verify code is pushed to GitHub

### Commands not showing
- Wait 5-10 minutes (Discord caches commands)
- Commands are deployed globally, so they might take up to 1 hour to appear
- Check logs - should say "Successfully reloaded 3 application (/) commands"

### /join doesn't work
- Make sure you're in a voice channel when you run the command
- Check bot has Connect and Speak permissions
- Try kicking and re-inviting the bot

### Bot is online but silent
- The bot only plays sounds automatically when connected via `/join`
- First use `/join` to connect it to your voice channel
- Then it will play random sounds every 30-60 minutes

---

**That's it!** Much simpler than before. No more confusing server IDs to copy!
