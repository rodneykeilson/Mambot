FROM node:18-alpine

# Install dependencies required for voice support
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    ffmpeg

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (use install instead of ci since we don't have package-lock.json)
RUN npm install --omit=dev

# Copy app source
COPY . .

# Expose port (some platforms require this even if not used)
EXPOSE 3000

# Start the bot
CMD ["npm", "start"]
