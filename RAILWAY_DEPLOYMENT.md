# Railway Deployment Guide

## Environment Variables to Add in Railway Dashboard

Go to your Railway project > Variables and add these:

```
APP_NAME=Expense Tracker
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.up.railway.app
APP_KEY=base64:ZXqbFFtPDRdPIGYJH2qS/tNIScqiwND03z0prMl4zBY=

LOG_CHANNEL=stderr
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=${{MYSQLHOST}}
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=CevdctZRmyAYYHSkSEbwispYJcRWeXtz

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

## Important Notes:

1. **DB_HOST**: Use `${{MYSQLHOST}}` - Railway will automatically inject the MySQL hostname
2. **DB_DATABASE**: Change "railway" to your actual database name in Railway
3. **DB_PASSWORD**: The password you provided
4. **APP_URL**: Replace "your-app-name" with your actual Railway app name
5. **LOG_CHANNEL**: Set to "stderr" for Railway logging

## Deploy Steps:

1. Push your code to GitHub
2. Connect your GitHub repo to Railway
3. Add the environment variables above in Railway Dashboard
4. Deploy the app

## After Deployment (Run these commands in Railway):

Run these commands using Railway's "Run a command" feature:

```bash
# Clear and rebuild config cache
php artisan config:cache

# Run migrations
php artisan migrate --force

# Create storage link (if needed)
php artisan storage:link
```

## If Still Getting 500 Error:

Check Railway deploy logs for the specific error. Common fixes:

1. Make sure APP_KEY is set correctly
2. Verify database credentials are correct
3. Check if migrations ran successfully
