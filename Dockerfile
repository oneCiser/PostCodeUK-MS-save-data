FROM node:15.7.0-alpine3.12

WORKDIR /app
COPY package*.json ./
RUN npm install -g typescript dotenv && npm cache clean --force
RUN npm install
COPY . .
CMD [ "npm", "run", "build" ]
CMD [ "npm", "start" ]