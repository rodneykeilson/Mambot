# Quick Setup Checklist for Wispbyte Deployment

Follow these steps in order:

## ✅ Step 1: Create Discord Bot
- [ ] Go to https://discord.com/developers/applications
- [ ] Click "New Application" and give it a name
- [ ] Go to "Bot" tab and click "Add Bot"
- [ ] Copy the bot token (keep it secret!)
- [ ] Enable **Server Members Intent** and **Message Content Intent**
- [ ] Go to "General Information" tab and copy **Application ID** (this is your CLIENT_ID)

## ✅ Step 2: Invite Bot to Your Server
- [ ] Go to "OAuth2" > "URL Generator"
- [ ] Check scopes: `bot` and `applications.commands`
- [ ] Check permissions: `Connect`, `Speak`, `Send Messages`, `Use Slash Commands`
- [ ] Copy the URL and open it in browser
- [ ] Select your server and authorize

## ✅ Step 3: Push Code to GitHub
```bash
# If you haven't already (check with: git remote -v)
# Create a new repository at https://github.com/new first!

git remote add origin https://github.com/YOUR_USERNAME/Mambot.git
git branch -M main
git push -u origin main
```

## ✅ Step 4: Deploy on Wispbyte
1. [ ] Go to wispbyte.com and login
2. [ ] Click "Create Server"
3. [ ] Connect GitHub and select your Mambot repository
4. [ ] Wispbyte will detect the Dockerfile automatically
5. [ ] Select Free tire (512 MB RAM, 1024 MB Disk)

## ✅ Step 5: Add Environment Variables
**IMPORTANT**: In Wispbyte server settings, add these environment variables:

- [ ] `DISCORD_TOKEN` = (paste your bot token)
- [ ] `CLIENT_ID` = (paste your application ID)

**That's it! Only 2 environment variables needed!**

⚠️ Make sure to click **Save** after adding variables!

## ✅ Step 6: Deploy
1. [ ] Click "Deploy" or "Start Server"
2. [ ] Wait for deployment (1-2 minutes)
3. [ ] Check logs for success message:
   ```
   ✅ Logged in as Mambot#XXXX
   📋 Bot is ready! Use /join in a voice channel to get started.
   ```

## 🎉 Done! Now Use the Bot

1. [ ] Join a voice channel in your Discord server
2. [ ] Type `/join` - bot joins your channel
3. [ ] Type `/mambot mambo` or `/mambot weii` - play sounds
4. [ ] Type `/leave` when you want the bot to leave

The bot will automatically play random sounds every 30-60 minutes while in the voice channel!

---

## 🔄 How It Works

**The bot connects to Discord using the environment variables:**
- `DISCORD_TOKEN` - Authenticates your bot with Discord
- `CLIENT_ID` - Identifies your application

**You control the bot with commands:**
- No need to hardcode server IDs or channel IDs
- Just use `/join` when you're in a voice channel
- Works in any server the bot is invited to!

---

## Common Issues

**Exit Code 128**: Environment variables not set correctly in Wispbyte  
**Bot not responding**: Wait a few minutes for commands to sync (can take up tto 1 hour)  
**Can't use /join**: Make sure you're in a voice channel first  
**No sound**: Check that bot has Connect and Speak permissions
