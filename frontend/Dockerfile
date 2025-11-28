FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json và lock file để tận dụng cache
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .
# Build ứng dụng ra các file tĩnh
RUN npm run build

# ----- Stage 2: Phục vụ file tĩnh bằng Nginx -----
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
# *** DÒNG SỬA LỖI ĐÂY ***
# Cài đặt 'gettext' để có lệnh 'envsubst'
RUN apk add --no-cache gettext
# Xóa file config mặc định của Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copy file build từ Stage 1
COPY --from=build /app/dist .

# Copy file config Nginx production của chúng ta
# (Xem Bước 3 để tạo file này)
COPY nginx.prod.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/sh", "-c", "envsubst '$API_URL $PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]