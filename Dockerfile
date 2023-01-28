FROM node:16-alpine
WORKDIR /usr/src/app

# install root
COPY ./package*.json /usr/src/app/
RUN npm install

# install frontend
COPY ./frontend/package*.json /usr/src/app/frontend/
RUN npm install --prefix frontend

# copy frontend files
COPY ./frontend/ /usr/src/app/frontend/

# build frontend
RUN npm run build --prefix frontend

# install api
COPY ./api/package*.json /usr/src/app/api/
RUN npm install --prefix api

# copy backend files
COPY ./api/ /usr/src/app/api/
RUN npm run build --prefix api

EXPOSE 5000
CMD [ "node", "dist/main.js" ]