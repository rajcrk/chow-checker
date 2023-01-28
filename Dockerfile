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

# install backend
COPY ./backend/package*.json /usr/src/app/backend/
RUN npm install --prefix backend

# copy backend files
COPY ./backend/ /usr/src/app/backend/

EXPOSE 5000
CMD [ "node", "./backend/server.js" ]