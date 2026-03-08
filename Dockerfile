FROM php:8.4-fpm

# Install system packages
RUN apt-get update && apt-get install -y \
    git curl zip unzip nginx supervisor \
    nodejs npm libpng-dev libonig-dev libxml2-dev

# PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project files
COPY . .

# Install backend dependencies
RUN composer install --optimize-autoloader --no-dev

# Install frontend dependencies and build React
RUN npm install && npm run build

# No need to copy - Vite builds directly to public/build

# Permissions fix
RUN chmod -R 755 storage bootstrap/cache

# Nginx config
COPY nginx.conf /etc/nginx/sites-available/default
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

# Supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p /var/log/supervisor /var/run/php

EXPOSE 80

CMD ["/usr/bin/supervisord", "-n"]