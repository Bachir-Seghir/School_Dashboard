# Use Node.js image
FROM --platform=linux/amd64 node:20.1.0-alpine AS base
# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project
COPY . .
RUN npx prisma generate

# Expose the Next.js dev server port
EXPOSE 3000

# Run Next.js in development mode
CMD ["npm", "run", "dev"]