# Step 1: Use a Node.js base image
FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Step 2: Build the Next.js app
FROM base AS builder

# Install development dependencies for the build process
RUN npm install

# Build the Next.js app
RUN npm run build

# Step 3: Prepare the production image
FROM node:18-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Expose the port Next.js will run on
EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Command to start the app
CMD ["npm", "start"]
