# Railway Deployment Guide

## Prerequisites (Before Deploying):

**Important:** Build your frontend assets locally first before pushing to GitHub:

```bash
npm run build
```

This creates the `public/build` folder with all compiled assets.

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

1. Build frontend locally: `npm run build`
2. Push your code to GitHub (include `public/build` folder)
3. Connect your GitHub repo to Railway
4. Add the environment variables above in Railway Dashboard
5. Deploy the app

## After Deployment:

Migrations will run automatically via releaseCommand. If needed, run manually:

```bash
php artisan migrate --force
```

## Configuration Files Created:

- `railway.json` - Railway deployment config
- `nixpacks.toml` - Nixpacks build configuration
