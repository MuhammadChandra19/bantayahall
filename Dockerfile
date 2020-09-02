# Base on offical Node.js Alpine image
FROM node:10 as build

WORKDIR /usr/app
# Set working directory

# Install PM2 globally
RUN npm install --global pm2

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install --production

# Copy all files
COPY . .

RUN npm run build


# Expose the listening port

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node


CMD [ "pm2-runtime", "npm", "--", "start" ]

