# Railway Deployment Guide

## Environment Variables to Add in Railway Dashboard

Go to your Railway project > Variables and add these:

```
APP_NAME=Expense Tracker
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.up.railway.app
APP_KEY=base64:ZXqbFFtPDRdPIGYJH2qS/tNIScqiwND03z0prMl4zBY=

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

## Deploy Steps:

1. Push your code to GitHub
2. Connect your GitHub repo to Railway
3. Add the environment variables above in Railway Dashboard
4. Deploy the app

## After Deployment:

Run migrations in Railway:

```bash
php artisan migrate --force
```

Or use Railway's "Run a command" feature to run migrations after deployment.
