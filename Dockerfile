# Step 1: Set up Node.js environment
FROM node:18-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all application files to the container
COPY . .

# Step 6: Build the Next.js app for production
RUN npm run build

# Step 7: Set up production environment
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Step 8: Copy the built files from the builder stage
COPY --from=builder /app ./

# Step 9: Install only production dependencies
RUN npm install --production

# Step 10: Expose the port for Next.js
EXPOSE 3000

# Step 11: Run the Next.js app in production mode
CMD ["npm", "start"]
