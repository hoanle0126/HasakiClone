.PHONY: help build up down logs restart clean dev prod

help:
	@echo "Available commands:"
	@echo "  make build    - Build all Docker images"
	@echo "  make up       - Start all services (production)"
	@echo "  make dev      - Start all services (development)"
	@echo "  make down     - Stop all services"
	@echo "  make logs     - View logs"
	@echo "  make restart  - Restart all services"
	@echo "  make clean    - Stop and remove all containers, volumes"
	@echo "  make shell-backend - Open shell in backend container"
	@echo "  make shell-frontend - Open shell in frontend container"
	@echo "  make shell-socket - Open shell in socket container"

build:
	docker-compose build

up:
	docker-compose up -d

dev:
	docker-compose -f docker-compose.dev.yml up -d

down:
	docker-compose down
	docker-compose -f docker-compose.dev.yml down

logs:
	docker-compose logs -f

restart:
	docker-compose restart

clean:
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f

shell-backend:
	docker exec -it hasaki_backend bash || docker exec -it hasaki_backend_dev bash

shell-frontend:
	docker exec -it hasaki_frontend sh || docker exec -it hasaki_frontend_dev sh

shell-socket:
	docker exec -it hasaki_socket sh || docker exec -it hasaki_socket_dev sh

