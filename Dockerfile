# Step 1: Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy app files & build
COPY . .
RUN npm run build

# Step 2: Create a minimal runtime image
FROM node:18-alpine
WORKDIR /app

# Copy production build from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", ".next/standalone/server.js"]
