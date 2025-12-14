#!/bin/sh
set -e

# Wait for database to be ready
echo "Waiting for database..."
until php -r "try { \$pdo = new PDO('mysql:host=${DB_HOST:-mysql};port=${DB_PORT:-3306}', '${DB_USERNAME:-hasaki}', '${DB_PASSWORD:-root}'); echo 'Database is ready!'; exit(0); } catch (Exception \$e) { exit(1); }" 2>/dev/null; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is ready!"

# Run migrations
echo "Running database migrations..."
php artisan migrate --force

# Run seeders if needed
if [ "$RUN_SEEDERS" = "true" ]; then
  echo "Running database seeders..."
  php -d memory_limit=-1 artisan db:seed --force
fi

# Clear and cache config
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Start PHP-FPM and Nginx
php-fpm -D
nginx -g "daemon off;"
