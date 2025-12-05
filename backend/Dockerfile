# BACKEND Dockerfile
FROM php:8.3-fpm

# Install extensions
RUN apt-get update && apt-get install -y \
    zip unzip git libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Copy Composer từ image chính thức
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy toàn bộ source
COPY . .

# Install Laravel deps
RUN composer install --no-dev --optimize-autoloader

# Fix quyền (rất quan trọng)
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

CMD ["php-fpm"]
