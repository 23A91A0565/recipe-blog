# Development mode (Turbopack build has known issues with Next.js 16.1.4)
FROM node:20-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for dev mode)
RUN npm ci

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000

# Start in development mode
CMD ["npm", "run", "dev"]
