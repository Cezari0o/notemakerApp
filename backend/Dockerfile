FROM node:14

WORKDIR /app
COPY package*.json /app

RUN npm install -g nodemon
RUN npm install
COPY . /app

ENV NODE_ENV=development
ENV PORT=3000
ENV MONGO_URI="mongodb://root:root123456@mongodb:27017"