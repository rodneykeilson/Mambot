# Quick Setup Checklist for Wispbyte Deployment

Follow these steps in order:

## ✅ Step 1: Create Discord Bot (if not done)
- [ ] Create application at https://discord.com/developers/applications
- [ ] Add bot user and copy the token
- [ ] Enable Server Members Intent and Message Content Intent
- [ ] Invite bot to your server with proper permissions (Connect, Speak, Use Slash Commands)

## ✅ Step 2: Get Your IDs
- [ ] Enable Developer Mode in Discord
- [ ] Copy your Server ID (Guild ID)
- [ ] Copy your Voice Channel ID
- [ ] Copy your Application ID (Client ID)

## ✅ Step 3: Push Code to GitHub
Open terminal in the Mambot folder and run:

```bash
# Create GitHub repository first at https://github.com/new
# Then run these commands (replace YOUR_USERNAME):

git remote add origin https://github.com/YOUR_USERNAME/Mambot.git
git branch -M main
git push -u origin main
```

## ✅ Step 4: Deploy on Wispbyte
1. [ ] Go to wispbyte.com and login
2. [ ] Click "Create Server"
3. [ ] Connect GitHub and select your Mambot repository
4. [ ] Select Free tier
5. [ ] Set Build Command: `npm install`
6. [ ] Set Start Command: `npm start`

## ✅ Step 5: Add Environment Variables
Add these in Wispbyte server settings:

- [ ] `DISCORD_TOKEN` = (your bot token)
- [ ] `CLIENT_ID` = (your application ID)
- [ ] `GUILD_ID` = (your server ID)
- [ ] `VOICE_CHANNEL_ID` = (your voice channel ID)
- [ ] `NODE_ENV` = production

**Important**: Click Save after adding all variables!

## ✅ Step 6: Deploy and Monitor
1. [ ] Click "Deploy" or "Start Server"
2. [ ] Watch the logs for success messages:
   - `✅ Commands deployed successfully`
   - `✅ Logged in as Mambot#XXXX`
   - `🔊 Joined voice channel`

## 🎉 Done!
Your bot should now be running 24/7!

Test it with `/mambot mambo` or `/mambot weii` in your Discord server.

---

## Common Issues

**Exit Code 128**: Environment variables not set or code not pushed to GitHub  
**Voice channel not found**: Wrong VOICE_CHANNEL_ID or bot lacks permissions  
**Commands not showing**: Wait a few minutes, Discord takes time to sync
