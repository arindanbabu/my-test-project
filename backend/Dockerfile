FROM node:20-alpine
WORKDIR /usr/src/app

# Install dependencies first (better build caching)
COPY package*.json ./
RUN npm install --production

# Copy application source files
COPY . .

EXPOSE 5000
CMD ["node", "index.js"]