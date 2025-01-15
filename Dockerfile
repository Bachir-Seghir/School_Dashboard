# Use an official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Use a minimal image to serve the built application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the build output and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
