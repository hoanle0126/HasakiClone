#!/bin/sh

# Dừng lại ngay nếu có lỗi
set -e

# 1. Chạy Database Migrations
echo "Running database migrations..."
php artisan migrate --force

# 2. Chạy Database Seeder với tăng giới hạn bộ nhớ
echo "Running database seeder..."
php -d memory_limit=-1 artisan db:seed --force