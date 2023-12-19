# Use the official Node.js LTS image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application using Vite
RUN npm run build

# Expose the port where your Vite application will run
EXPOSE 3000

# Start the application
CMD ["npm", "run", "preview"]
