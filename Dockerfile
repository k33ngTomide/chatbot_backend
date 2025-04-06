# Use Node.js base image
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN node ace build

EXPOSE 3333

CMD ["npm", "start"]
