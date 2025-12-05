# FRONTEND Dockerfile
FROM node:20.19.5-alpine AS builder

WORKDIR /app

# Copy package và lockfile
COPY package*.json ./

# Set registry tránh lỗi npm 500
RUN npm config set registry https://registry.npmmirror.com

# Cài dependencies dùng npm ci (chuẩn cho production)
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Serve bằng nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
