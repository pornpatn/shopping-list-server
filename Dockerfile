FROM --platform=linux/amd64 node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "node", "index.js" ]
