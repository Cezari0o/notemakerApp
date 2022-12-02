FROM node:14

WORKDIR /app
COPY package*.json /app
EXPOSE 3000

# RUN npm install -g nodemon
RUN npm install
COPY . /app

ENV PORT=3000

CMD [ "npm", "run", "dev" ]