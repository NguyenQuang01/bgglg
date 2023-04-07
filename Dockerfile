# Specify the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

ENV HOST 0.0.0.0

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
