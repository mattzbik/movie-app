# Use Node.js official image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]