FROM node:latest

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN yarn build

# Start the application
CMD ["yarn", "start"]
