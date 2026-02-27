# Expense Tracking Web Application

A comprehensive fullstack expense tracking application built with Laravel, Inertia.js, and React. Track your expenses, manage categories, view detailed analytics, and make informed financial decisions.

## Features

### ✨ Core Features

#### 1. Authentication System

- User registration with email verification
- Secure login/logout
- Password reset functionality
- Two-factor authentication support (via Laravel Fortify)
- Protected dashboard and expense management pages

#### 2. Expense Management (CRUD)

- **Create**: Add new expenses with title, amount, category, date, and optional description
- **Read**: View all your expenses with detailed information
- **Update**: Edit expense details anytime
- **Delete**: Remove expenses you no longer need
- Each expense is linked to your user account and category

#### 3. Category Management

- Create custom expense categories
- Assign colors to categories for easy identification
- Edit category details
- Delete categories (if no expenses are linked)
- Manage all your expense categories from one place

#### 4. Dashboard with Analytics

- **Total Expenses**: This month and this year overview
- **Monthly Expense Chart**: Bar chart showing expenses over the last 12 months
- **Category Breakdown**: Pie chart showing how much you spend per category
- **Recent Transactions**: Quick view of your 5 most recent expenses

### 📊 Advanced Features

#### Filtering & Sorting

- **Filter by Date Range**: View expenses within specific date periods
- **Filter by Category**: See expenses for specific categories
- **Sort by Multiple Fields**:
    - Date (Newest/Oldest)
    - Amount (Low to High / High to Low)
    - Title (A-Z / Z-A)

#### Data Visualization

- **Monthly Bar Chart**: Track spending trends over time
- **Category Pie Chart**: Visual breakdown of spending by category
- **Recent Transactions Table**: Quick overview of latest expenses

#### Security & Authorization

- User-specific data isolation (users can only see their own expenses)
- Authorization policies for expense and category management
- CSRF protection on all forms
- Password hashing and secure authentication

## Database Structure

### Users Table

- Default Laravel users table with authentication fields
- Modified to include two-factor authentication columns

### Categories Table

```sql
- id (Primary Key)
- user_id (Foreign Key to Users)
- name (String)
- color (String, hex color code)
- icon (String, nullable)
- timestamps
- Unique constraint: user_id + name
```

### Expenses Table

```sql
- id (Primary Key)
- user_id (Foreign Key to Users)
- category_id (Foreign Key to Categories)
- title (String)
- amount (Decimal 10,2)
- expense_date (Date)
- description (Text, nullable)
- timestamps
- Indexes on: user_id, expense_date, category_id
```

## Tech Stack

### Backend

- **Framework**: Laravel 12
- **Authentication**: Laravel Fortify
- **ORM**: Eloquent
- **Database**: MySQL (or SQLite for development)

### Frontend

- **Library**: React 19
- **UI Framework**: Tailwind CSS 4
- **Page Framework**: Inertia.js
- **Charts**: Recharts
- **Icons**: Lucide React
- **Form Handling**: Inertia's built-in form helper

### Development Tools

- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: npm & Composer
- **Linting**: ESLint & Pint
- **Testing**: Pest (PHP) & Vitest (JS)

## Installation & Setup

### Prerequisites

- PHP 8.2+
- Node.js 18+
- MySQL 5.7+ or SQLite
- Composer
- npm

### Step 1: Clone & Install Dependencies

```bash
cd exptrack
composer install
npm install
```

### Step 2: Environment Setup

```bash
# Create .env file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=exptrack
DB_USERNAME=root
DB_PASSWORD=
```

### Step 3: Database Migrations

```bash
php artisan migrate
```

### Step 4: (Optional) Seed Sample Data

```bash
php artisan db:seed
```

### Step 5: Run the Application

```bash
# Development mode
npm run dev

# In another terminal
php artisan serve
```

The application will be available at `http://localhost:8000`

## Project Structure

```
app/
├── Models/
│   ├── User.php
│   ├── Category.php
│   └── Expense.php
├── Http/
│   ├── Controllers/
│   │   ├── CategoryController.php
│   │   └── ExpenseController.php
│   └── Requests/
├── Policies/
│   ├── CategoryPolicy.php
│   └── ExpensePolicy.php
└── Providers/

resources/
├── js/
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Expenses/
│   │   │   ├── Index.tsx
│   │   │   ├── Create.tsx
│   │   │   └── Edit.tsx
│   │   └── Categories/
│   │       └── Index.tsx
│   └── components/
│       └── app-sidebar.tsx

database/
├── migrations/
│   ├── 2025_02_27_000001_create_categories_table.php
│   └── 2025_02_27_000002_create_expenses_table.php
├── factories/
│   ├── CategoryFactory.php
│   └── ExpenseFactory.php
└── seeders/

routes/
├── web.php
└── api.php (optional)
```

## API Routes

### Authenticated Routes (Requires 'auth', 'verified' Middleware)

#### Dashboard

- `GET /dashboard` - View dashboard with statistics

#### Expenses

- `GET /expenses` - List all expenses with filtering and sorting
- `GET /expenses/create` - Show create expense form
- `POST /expenses` - Store new expense
- `GET /expenses/{id}/edit` - Show edit expense form
- `PUT/PATCH /expenses/{id}` - Update expense
- `DELETE /expenses/{id}` - Delete expense
- `GET /api/dashboard-stats` - Get dashboard statistics (JSON)

#### Categories

- `GET /categories` - List all categories
- `POST /categories` - Create new category
- `PUT/PATCH /categories/{id}` - Update category
- `DELETE /categories/{id}` - Delete category

## Usage Guide

### Creating an Expense

1. Click "Add Expense" button or navigate to Expenses
2. Fill in the required fields:
    - Title: Name of the expense (e.g., "Grocery Shopping")
    - Amount: Cost in dollars
    - Category: Select from your categories
    - Date: When the expense occurred
    - Due Date: Optional field for bill due dates or deadlines
    - Paid: Checkbox to mark the expense as paid
    - Description: Optional notes
3. Click "Create Expense"

### Managing Categories

1. Go to Categories in the sidebar
2. Create new categories with custom colors
3. Edit existing categories
4. Delete unused categories

### Viewing Analytics

1. Dashboard shows:
    - Total spent this month and year
    - 12-month expense trends
    - Spending by category
    - Recent transactions

### Filtering Expenses

1. Use the filter panel on Expenses page
2. Set date range, select category
3. Choose sort field and order
4. Click "Apply Filters"

## Security Features

### Authorization

- Policies ensure users can only manage their own data
- Category deletion is restricted if expenses are linked
- User-specific expense queries in controllers

### Data Protection

- CSRF tokens on all forms
- Password hashing using Laravel defaults
- SQL injection prevention via Eloquent ORM
- Secure session handling

### Validation

- Server-side validation on all inputs
- Client-side validation for better UX
- Custom validation rules for unique categories per user

## Future Enhancement Ideas

### Reporting

- Monthly expense reports
- PDF export functionality
- CSV/Excel export

### Budget Management

- Set monthly budgets per category
- Budget alerts when approaching limits
- Comparison: actual vs budgeted spending

### Advanced Features

- Income tracking
- Multi-currency support
- Recurring expenses
- Bill reminders
- Budget forecasting
- Financial goals tracking

### Mobile

- Mobile-responsive improvements
- Mobile app (React Native)
- PWA support

### Analytics

- Spending trends analysis
- Predictive analytics
- Advanced statistics

### Notifications

- Email notifications for budget overages
- SMS notifications (optional)
- In-app notifications

### Integration

- Bank account integration (Plaid)
- Payment gateway integration
- Cloud backup

## Troubleshooting

### Database Connection Error

- Verify .env database credentials
- Ensure MySQL/SQLite is running
- Check database exists: `php artisan migrate`

### npm Packages Not Found

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Changes Not Reflecting

- For PHP: Clear cache `php artisan cache:clear`
- For JS: Rebuild assets `npm run build`

### Authentication Issues

- Ensure user is verified: `php artisan tinker` → `User::first()->update(['email_verified_at' => now()])`
- Check session storage in .env

## Contributing

Contributions are welcome! Please follow Laravel and React coding standards.

## License

MIT License - Free to use and modify.

## Support

For issues or questions:

1. Check the documentation above
2. Review Laravel documentation: https://laravel.com/docs
3. Check Inertia.js documentation: https://inertiajs.com
4. Review React documentation: https://react.dev

---

**Happy Tracking! 💰📊**
