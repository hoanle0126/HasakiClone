# SOCKET.IO Dockerfile
FROM node:20.19.5

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com \
    && npm ci

COPY . .

EXPOSE 3001
CMD ["node", "server.js"]
