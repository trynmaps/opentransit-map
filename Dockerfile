FROM node:8.6.0

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Bundle app source
COPY . .

# Use prod-config, comment out to use local env config
COPY ./src/prodConfig.json ./src/config.json

CMD [ "yarn", "run", "build" ]

COPY ./build .

# Build
# docker build -t tryn-react .

# Run
# docker run -p 3000:3000 tryn-react:latest
