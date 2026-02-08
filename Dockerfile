FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port (required by some platforms even if not used)
EXPOSE 3000

# Start the bot
CMD ["npm", "start"]
