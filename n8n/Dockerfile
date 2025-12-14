FROM n8nio/n8n:latest

# Tạo thư mục để lưu dữ liệu n8n
RUN mkdir -p /home/node/.n8n

# Set quyền cho user node
USER node

# Expose port mặc định của n8n
EXPOSE 5678

# n8n sẽ tự động chạy khi container start
