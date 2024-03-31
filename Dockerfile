# Step 1: Build the Next.js application
# Use an official Node.js runtime as a parent image
FROM node:20-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to workdir
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your application's code
COPY . .

# Build your Next.js app
RUN npm run build

# Step 2: Run the Next.js application
# Use an official Node.js runtime as a parent image for the runner stage
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the build output to the new workdir
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
