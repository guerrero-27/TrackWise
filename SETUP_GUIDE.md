# Expense Tracker - Quick Start Guide

## 🚀 Installation Steps

This guide will help you set up and run the Expense Tracking application on your local machine.

### Prerequisites

Before you start, make sure you have these installed:

- **PHP 8.2+** ([Download](https://www.php.net/downloads))
- **Composer** ([Download](https://getcomposer.org/download/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **MySQL 5.7+** or **SQLite** ([Download MySQL](https://www.mysql.com/downloads/))
- **Git** (optional, for cloning the repository)

Verify installation by running:

```bash
php --version
composer --version
node --version
npm --version
```

---

## Step-by-Step Setup

### 1️⃣ Install Backend Dependencies

```bash
cd exptrack
composer install
```

This installs all PHP dependencies listed in `composer.json`

### 2️⃣ Install Frontend Dependencies

```bash
npm install
```

This installs all JavaScript/TypeScript dependencies including React, Tailwind, etc.

### 3️⃣ Create Environment File

```bash
# Copy the example .env file
cp .env.example .env

# Or on Windows
copy .env.example .env
```

### 4️⃣ Generate Application Key

```bash
php artisan key:generate
```

This generates a unique application key needed for encryption.

### 5️⃣ Configure Database

Open `.env` file and configure your database:

**For MySQL:**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=exptrack
DB_USERNAME=root
DB_PASSWORD=your_password
```

**For SQLite (easiest for local development):**

```env
DB_CONNECTION=sqlite
# Make sure database file exists
```

**Create MySQL database (if using MySQL):**

```bash
mysql -u root -p
CREATE DATABASE exptrack;
EXIT;
```

### 6️⃣ Run Database Migrations

```bash
php artisan migrate
```

This creates all the necessary database tables (users, categories, expenses, etc.)

### 7️⃣ (Optional) Seed Sample Data

```bash
php artisan db:seed
```

This populates the database with sample data for testing:

- Test user account
- Sample categories (Groceries, Utilities, etc.)
- Sample expenses from the past 90 days

**Test Account Credentials:**

- Email: `test@example.com`
- Password: `password`

### 8️⃣ Build Frontend Assets

```bash
npm run build
```

---

## 🎯 Running the Application

### Option 1: Development Mode (Recommended)

Open **two terminal windows**:

**Terminal 1 - Backend Server:**

```bash
php artisan serve
```

Server runs at: `http://localhost:8000`

**Terminal 2 - Frontend Build (Keep running):**

```bash
npm run dev
```

Vite dev server runs at: `http://localhost:5173`

### Option 2: Using Composer Script

```bash
composer dev
```

This runs both Laravel and Vite servers simultaneously using concurrently.

### Option 3: Production Build

```bash
npm run build
```

Then access at: `http://localhost:8000`

---

## 🔐 First Login

1. Navigate to `http://localhost:8000`
2. Click **"Register"** to create a new account OR
3. Use test credentials:
    - Email: `test@example.com`
    - Password: `password`
4. You'll be taken to the dashboard after verification

---

## 📝 Creating Your First Expense

1. **Go to Dashboard** - See your spending overview
2. **Add Expense** - Click the "Add Expense" button
3. **Fill in details:**
    - Title: Name of the expense (e.g., "Grocery Shopping")
    - Amount: Cost amount (e.g., 45.50)
    - Category: Select from dropdown
    - Date: When you made the expense
    - Due Date: Optional deadline or bill due date
    - Paid: Check this if you have already paid the bill
    - Description: Optional notes
4. **Save** and see it appear in your expenses list

---

## 📊 Dashboard Features

- **Stats Cards**: Total expenses this month and year
- **Monthly Chart**: Bar chart showing 12-month trends
- **Category Chart**: Pie chart showing spending by category
- **Recent Transactions**: Your 5 latest expenses

---

## 🛠 Project Structure

```
exptrack/
├── app/
│   ├── Models/              # Database models
│   ├── Http/Controllers/    # Business logic
│   ├── Policies/            # Authorization rules
│   └── Providers/           # Service providers
├── resources/
│   ├── js/
│   │   ├── pages/          # React page components
│   │   ├── components/     # Reusable React components
│   │   └── layouts/        # Layout templates
│   ├── css/                # Stylesheets
│   └── views/              # Blade templates
├── database/
│   ├── migrations/         # Database structure
│   ├── seeders/           # Sample data
│   └── factories/         # Test data builders
├── routes/
│   ├── web.php            # Web routes
│   └── api.php            # API routes
├── public/                # Public assets
├── config/                # Configuration files
├── .env                   # Environment variables (local)
├── .env.example           # Example env file
└── package.json           # NPM dependencies
```

---

## 🔑 Key Features to Try

### 1. Expense Management

- Create, edit, delete expenses
- Each expense linked to a category
- Optional descriptions and notes

### 2. Category Management

- Create custom categories
- Assign colors to categories
- Organize your spending

### 3. Filtering & Sorting

- Filter by date range
- Filter by category
- Sort by date, amount, or title

### 4. Analytics Dashboard

- View spending trends
- Category breakdown visualization
- Monthly comparison charts
- Recent transaction summary

---

## 🐛 Troubleshooting

### Problem: "SQLSTATE[HY000]: General error"

**Solution:**

```bash
php artisan config:clear
php artisan cache:clear
```

### Problem: Node modules not found

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: Port 8000 already in use

**Solution:**

```bash
# Use different port
php artisan serve --port=8001
```

### Problem: Database connection error

**Solution:**

1. Check `.env` database credentials
2. Ensure MySQL is running (or remove it for SQLite)
3. Verify database exists: `php artisan migrate`

### Problem: Tailwind styles not showing

**Solution:**

```bash
npm run build
# Then reload browser (Ctrl+Shift+R)
```

### Problem: Commands not found

**Solution:**

- Ensure you're in the correct directory: `cd exptrack`
- For PHP commands: `php artisan ...`
- For npm commands: `npm run ...`

---

## 📚 Useful Commands

### PHP Artisan

```bash
php artisan migrate           # Run migrations
php artisan migrate:refresh   # Reset and run migrations
php artisan db:seed          # Seed sample data
php artisan tinker           # Open PHP REPL
php artisan serve            # Start dev server
```

### NPM/Node

```bash
npm run dev               # Start dev server
npm run build             # Build for production
npm run lint              # Check code style
npm run format            # Format code
```

### Composer

```bash
composer install          # Install dependencies
composer dump-autoload    # Rebuild autoloader
composer update           # Update dependencies
```

---

## 📖 Documentation Links

- **Laravel Docs**: https://laravel.com/docs
- **Inertia.js**: https://inertiajs.com
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Recharts**: https://recharts.org

---

## 🎓 Next Steps

1. **Explore the Dashboard** - Get familiar with the interface
2. **Add Sample Data** - Create some expenses and categories
3. **Customize Categories** - Add your own spending categories
4. **Review Analytics** - Check out the charts and statistics
5. **Invite Others** - Register additional users
6. **Backup Data** - Consider setting up regular backups

---

## ⚙️ Environment Variables

Key variables in `.env`:

```env
APP_NAME=ExpenseTracker           # App name
APP_DEBUG=true                    # Debug mode
APP_ENV=local                     # Environment
APP_URL=http://localhost:8000     # Application URL

DB_CONNECTION=mysql               # Database type
DB_HOST=127.0.0.1                # Database host
DB_PORT=3306                      # Database port
DB_DATABASE=exptrack              # Database name
DB_USERNAME=root                  # Database user
DB_PASSWORD=                      # Database password

MAIL_DRIVER=log                   # Email driver
SESSION_DRIVER=file              # Session storage
```

---

## 🚀 Deployment (Production)

For production deployment:

1. **Environment Setup**

    ```bash
    APP_ENV=production
    APP_DEBUG=false
    DB_CONNECTION=mysql
    # Use strong credentials
    ```

2. **Build Assets**

    ```bash
    npm run build
    php artisan config:cache
    php artisan route:cache
    ```

3. **Run Migrations**

    ```bash
    php artisan migrate --force
    ```

4. **Set Permissions**
    ```bash
    chmod -R 775 storage bootstrap/cache
    ```

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the main README_EXPENSE_APP.md
3. Check Laravel logs: `storage/logs/`
4. Enable debug mode in `.env` for detailed errors

---

**Happy Expense Tracking! 💰✨**
