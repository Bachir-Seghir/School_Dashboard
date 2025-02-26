# Use Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Expose the Next.js dev server port
EXPOSE 3000

# Run Next.js in development mode
CMD ["npm", "run", "dev"]
