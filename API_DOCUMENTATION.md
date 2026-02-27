# API Documentation - Expense Tracker

## Overview

This document describes all available API endpoints in the Expense Tracking application.

**Base URL**: `http://localhost:8000`

**Authentication**: All endpoints require user to be logged in (via Laravel Fortify)

**Response Format**: JSON for API endpoints, HTML for page routes

---

## Authentication Endpoints

These are handled by Laravel Fortify and are already configured.

### Register

- **POST** `/register`
- Creates new user account
- Returns HTML response (handled by Fortify)

### Login

- **POST** `/login`
- Authenticates user
- Returns HTML response (handled by Fortify)

### Logout

- **POST** `/logout`
- Logs out current user
- Returns redirect

### Password Reset

- **POST** `/forgot-password`
- **POST** `/reset-password`
- Handled by Fortify

---

## Expense Endpoints

All expense endpoints require authentication.

### List Expenses

```
GET /expenses
```

**Parameters** (Query String):

- `start_date` (optional): Filter start date (YYYY-MM-DD)
- `end_date` (optional): Filter end date (YYYY-MM-DD)
- `category_id` (optional): Filter by category ID
- `sort_by` (optional): `expense_date`, `amount`, or `title`
- `sort_order` (optional): `asc` or `desc`
- `page` (optional): Page number for pagination

**Example Request**:

```
GET /expenses?start_date=2025-01-01&end_date=2025-02-28&category_id=1&sort_by=amount&sort_order=desc&page=1
```

**Response**: HTML page with paginated expenses

**Response Data** (passed to React):

```json
{
    "expenses": {
        "data": [
            {
                "id": 1,
                "title": "Groceries",
                "amount": "125.50",
                "expense_date": "2025-02-27",
                "description": "Weekly shopping",
                "category": {
                    "id": 1,
                    "name": "Groceries",
                    "color": "#10B981"
                },
                "created_at": "2025-02-27T10:30:00.000000Z"
            }
        ],
        "current_page": 1,
        "last_page": 5,
        "total": 75
    },
    "categories": {
        "1": "Groceries",
        "2": "Utilities",
        "3": "Transportation"
    },
    "filters": {
        "start_date": "2025-01-01",
        "end_date": "2025-02-28",
        "category_id": 1,
        "sort_by": "amount",
        "sort_order": "desc"
    }
}
```

---

### Create Expense (Show Form)

```
GET /expenses/create
```

**Response**: HTML with create form and categories

**Response Data**:

```json
{
    "categories": [
        {
            "id": 1,
            "name": "Groceries",
            "color": "#10B981"
        }
    ]
}
```

---

### Store Expense

```
POST /expenses
```

**Headers**:

- `Content-Type: application/x-www-form-urlencoded`
- `X-CSRF-TOKEN: <csrf_token>`

**Request Body**:

```json
{
    "title": "Grocery Shopping",
    "amount": "125.50",
    "category_id": 1,
    "expense_date": "2025-02-27",
    "description": "Weekly groceries from supermarket"
}
```

**Validation Rules**:

- `title`: Required, string, max 255 characters
- `amount`: Required, numeric, min 0.01, max 999999.99
- `category_id`: Required, must exist in categories table and belong to user
- `expense_date`: Required, must be a valid date
- `description`: Optional, string, max 1000 characters

**Success Response** (302 Redirect):

- Redirects to `/expenses` with success flash message

**Error Response** (422 Unprocessable Entity):

```json
{
    "errors": {
        "title": ["The title field is required."],
        "amount": ["The amount must be at least 0.01."]
    }
}
```

---

### Edit Expense (Show Form)

```
GET /expenses/{id}/edit
```

**URL Parameters**:

- `id`: Expense ID (integer)

**Authorization**: User must own the expense

**Response**: HTML with pre-filled form

**Response Data**:

```json
{
    "expense": {
        "id": 1,
        "title": "Grocery Shopping",
        "amount": "125.50",
        "category_id": 1,
        "expense_date": "2025-02-27",
        "description": "Weekly groceries",
        "category": {
            "id": 1,
            "name": "Groceries",
            "color": "#10B981"
        }
    },
    "categories": [
        {
            "id": 1,
            "name": "Groceries",
            "color": "#10B981"
        }
    ]
}
```

---

### Update Expense

```
PUT /expenses/{id}
PUT /expenses/{id} (with _method=PUT in form)
```

**URL Parameters**:

- `id`: Expense ID (integer)

**Headers**:

- `Content-Type: application/x-www-form-urlencoded`
- `X-CSRF-TOKEN: <csrf_token>`

**Request Body**: Same as Store Expense

**Authorization**: User must own the expense

**Success Response** (302 Redirect):

- Redirects to `/expenses` with success flash message

---

### Delete Expense

```
DELETE /expenses/{id}
POST /expenses/{id} (with _method=DELETE in form)
```

**URL Parameters**:

- `id`: Expense ID (integer)

**Headers**:

- `X-CSRF-TOKEN: <csrf_token>`

**Authorization**: User must own the expense

**Success Response** (302 Redirect):

- Redirects back with success flash message

**Error Response** (403 Forbidden):

```json
{
    "message": "This action is unauthorized."
}
```

---

## Category Endpoints

All category endpoints require authentication.

### List Categories

```
GET /categories
```

**Response**: HTML page with category management interface

**Response Data**:

```json
{
    "categories": [
        {
            "id": 1,
            "name": "Groceries",
            "color": "#10B981",
            "icon": null,
            "user_id": 1,
            "created_at": "2025-02-27T10:30:00.000000Z"
        }
    ]
}
```

---

### Create Category

```
POST /categories
```

**Headers**:

- `Content-Type: application/x-www-form-urlencoded`
- `X-CSRF-TOKEN: <csrf_token>`

**Request Body**:

```json
{
    "name": "Groceries",
    "color": "#10B981",
    "icon": null
}
```

**Validation Rules**:

- `name`: Required, string, max 255, unique per user
- `color`: Optional, hex color format (#RRGGBB or #RGB)
- `icon`: Optional, string, max 50

**Available Colors** (Suggested):

```
#6366F1 - Indigo
#8B5CF6 - Purple
#EC4899 - Pink
#F59E0B - Amber
#10B981 - Emerald
#3B82F6 - Blue
#06B6D4 - Cyan
#EF4444 - Red
#F97316 - Orange
#14B8A6 - Teal
```

**Success Response** (302 Redirect):

- Redirects back with success flash message

**Error Response** (422):

```json
{
    "errors": {
        "name": ["The name has already been taken for this user."]
    }
}
```

---

### Update Category

```
PUT /categories/{id}
PATCH /categories/{id}
POST /categories/{id} (with _method=PUT/PATCH)
```

**URL Parameters**:

- `id`: Category ID (integer)

**Request Body**: Same as Create Category

**Authorization**: User must own the category

**Success Response**: 302 Redirect back

---

### Delete Category

```
DELETE /categories/{id}
POST /categories/{id} (with _method=DELETE)
```

**URL Parameters**:

- `id`: Category ID (integer)

**Headers**:

- `X-CSRF-TOKEN: <csrf_token>`

**Authorization**: User must own the category

**Validation**: Category cannot have linked expenses

**Error Response** (422):

```json
{
    "message": "Cannot delete category with existing expenses."
}
```

**Success Response**: 302 Redirect back

---

## Dashboard API

### Get Dashboard Statistics

```
GET /api/dashboard-stats
```

**Headers**:

- `Accept: application/json`

**Authentication**: Required

**Response**:

```json
{
    "totalThisMonth": 1234.56,
    "totalThisYear": 15234.89,
    "categoryBreakdown": [
        {
            "name": "Groceries",
            "amount": 450.0,
            "color": "#10B981"
        },
        {
            "name": "Utilities",
            "amount": 320.0,
            "color": "#F59E0B"
        }
    ],
    "recentTransactions": [
        {
            "id": 15,
            "title": "Grocery Shopping",
            "amount": "125.50",
            "expense_date": "2025-02-27",
            "category": {
                "id": 1,
                "name": "Groceries",
                "color": "#10B981"
            },
            "created_at": "2025-02-27T10:30:00.000000Z"
        }
    ],
    "monthlyData": [
        {
            "month": "Mar 2024",
            "amount": 1100.0
        },
        {
            "month": "Apr 2024",
            "amount": 1200.0
        },
        {
            "month": "May 2024",
            "amount": 950.0
        }
    ]
}
```

**Response Fields**:

- `totalThisMonth`: Float - Total expenses amount for current month
- `totalThisYear`: Float - Total expenses amount for current year
- `categoryBreakdown`: Array - Expenses grouped by category (this month)
- `recentTransactions`: Array - Last 5 expenses with category details
- `monthlyData`: Array - Last 12 months of expense totals

---

## Error Responses

### 401 Unauthorized

User is not authenticated

```json
{
    "message": "Unauthorized"
}
```

### 403 Forbidden

User is authenticated but not authorized to access this resource

```json
{
    "message": "This action is unauthorized."
}
```

### 404 Not Found

Resource does not exist

```json
{
    "message": "Not found"
}
```

### 422 Unprocessable Entity

Validation failed

```json
{
    "errors": {
        "field_name": ["Error message"]
    }
}
```

### 500 Internal Server Error

Server error occurred

```json
{
    "message": "Internal Server Error"
}
```

---

## Rate Limiting

No rate limiting is currently implemented. This is recommended for production deployments.

---

## CORS

CORS is not enabled by default. For frontend requests from different origins, update `config/cors.php`.

---

## Pagination

Expense list returns paginated data:

- 15 items per page
- Use `?page=2` to access subsequent pages
- Response includes:
    - `current_page`: Current page number
    - `last_page`: Last available page
    - `total`: Total number of items

---

## Date Formats

- **Request dates**: `YYYY-MM-DD` (e.g., 2025-02-27)
- **Response dates**: ISO 8601 format (e.g., 2025-02-27T10:30:00.000000Z)
- **Amount format**: Decimal with 2 digits (e.g., 125.50)

---

## Example Workflow

### 1. Register and Create First Expense

```bash
# 1. Register (handled by Fortify authentication)
POST /register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

# 2. Login
POST /login
{
  "email": "john@example.com",
  "password": "password123"
}

# 3. Get CSRF token (embedded in page)
GET /expenses/create

# 4. Create category
POST /categories
X-CSRF-TOKEN: <token>
{
  "name": "Groceries",
  "color": "#10B981"
}

# 5. Create expense
POST /expenses
X-CSRF-TOKEN: <token>
{
  "title": "Weekly Groceries",
  "amount": "125.50",
  "category_id": 1,
  "expense_date": "2025-02-27",
  "description": "Supermarket shopping"
}

# 6. View statistics
GET /api/dashboard-stats
Accept: application/json
```

---

## Debugging

### Enable Query Logging

Add to `.env`:

```env
APP_DEBUG=true
```

### Check Logs

```bash
tail -f storage/logs/laravel.log
```

### Use Tinker (PHP REPL)

```bash
php artisan tinker

# View user expenses
User::first()->expenses()->get();

# View user categories
User::first()->categories()->get();
```

---

## Version History

- **v1.0** (2025-02-27):
    - Initial implementation
    - Full CRUD for expenses and categories
    - Dashboard with analytics
    - Filtering and sorting

---

## Future API Enhancements

- [ ] Income endpoints
- [ ] Budget endpoints
- [ ] Report generation
- [ ] Data export (CSV, PDF)
- [ ] API token authentication (Sanctum)
- [ ] Webhook support
- [ ] GraphQL alternative
- [ ] Rate limiting
- [ ] Cache headers

---

**Last Updated**: February 27, 2025
