FROM node:16-alpine
WORKDIR /usr/src/app

# install root
COPY package*.json ./
RUN npm install

# install frontend
COPY . .
RUN npm run build

EXPOSE 8080
CMD ["node", "dist/main"]