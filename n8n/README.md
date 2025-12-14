# n8n Service

Thư mục này chứa cấu hình Docker cho n8n - một công cụ workflow automation.

## Cấu hình

n8n sẽ chạy trên port 5678 (mặc định) và có thể truy cập qua:
- Production: http://localhost:5678
- Development: http://localhost:5678

## Dữ liệu

Dữ liệu của n8n (workflows, credentials) sẽ được lưu trong volume `n8n_data` để đảm bảo dữ liệu không bị mất khi container restart.

## Biến môi trường

Các biến môi trường có thể được cấu hình trong docker-compose.yml:
- `N8N_BASIC_AUTH_ACTIVE`: Bật/tắt basic authentication
- `N8N_BASIC_AUTH_USER`: Username cho basic auth
- `N8N_BASIC_AUTH_PASSWORD`: Password cho basic auth
- `N8N_HOST`: Host của n8n
- `N8N_PORT`: Port của n8n (mặc định 5678)
- `N8N_PROTOCOL`: Protocol (http/https)
- `WEBHOOK_URL`: URL cho webhooks (ví dụ: http://localhost:5678/)

