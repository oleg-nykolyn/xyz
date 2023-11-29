FROM node:18-alpine

WORKDIR /hardhat

COPY package*.json .

RUN npm install

COPY hardhat.config.js .

CMD [ "npx", "hardhat", "node" ]
