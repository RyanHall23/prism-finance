# Prism Finance Backend API

Secure backend API for the Prism Finance application with PostgreSQL database, JWT authentication, and encrypted data storage.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 🗄️ **PostgreSQL Database** - Relational database with encrypted data
- 🔒 **Password Hashing** - bcrypt for secure password storage
- 🛡️ **Security** - Helmet, CORS, rate limiting
- 📊 **Financial Calculations** - Server-side interest and balance calculations
- 👤 **Multi-User Support** - Each user has isolated data
- 🔑 **Access Control** - Protected endpoints require authentication

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Setup

### Prerequisites

- Node.js 16+
- PostgreSQL 12+

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials and JWT secret:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_planner
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secure_random_secret
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:3000
```

4. Initialize the database:
```bash
npm run init-db
```

5. Start the server:
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "new_username",
  "email": "newemail@example.com"
}
```

#### Update Password
```http
PUT /api/auth/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

#### Delete Account
```http
DELETE /api/auth/account
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "user_password"
}
```

### Financial Data

All financial endpoints require authentication via `Authorization: Bearer <token>` header.

#### Get Financial Overview
```http
GET /api/financial/overview
Authorization: Bearer <token>
```

Returns:
```json
{
  "monthlyIncome": 2500.00,
  "monthlyExpenses": 850.00,
  "monthlySavings": 300.00,
  "remainingBalance": 1350.00,
  "overdraft": {
    "id": 1,
    "limit_amount": 1000.00,
    "current_balance": 0,
    "apr": 19.9,
    "monthlyInterest": 0,
    "availableCredit": 1000.00
  },
  "creditCard": {
    "id": 1,
    "limit_amount": 5000.00,
    "current_balance": 0,
    "apr": 21.9,
    "monthlyInterest": 0,
    "availableCredit": 5000.00
  }
}
```

#### Income Endpoints

```http
GET /api/financial/incomes
POST /api/financial/incomes
PUT /api/financial/incomes/:id
DELETE /api/financial/incomes/:id
```

Create Income Example:
```json
{
  "amount": 2500.00,
  "category": "Salary",
  "date": "2026-02-25",
  "recurring": true,
  "payDay": 25,
  "notes": "Monthly salary"
}
```

#### Expense Endpoints

```http
GET /api/financial/expenses
POST /api/financial/expenses
PUT /api/financial/expenses/:id
DELETE /api/financial/expenses/:id
```

Create Expense Example:
```json
{
  "amount": 850.00,
  "category": "Rent",
  "date": "2026-02-01",
  "recurring": true,
  "notes": "Monthly rent payment"
}
```

#### Savings Endpoints

```http
GET /api/financial/savings
POST /api/financial/savings
PUT /api/financial/savings/:id
DELETE /api/financial/savings/:id
```

Create Savings Example:
```json
{
  "name": "Emergency Fund",
  "currentBalance": 2000.00,
  "monthlyDeposit": 300.00,
  "goal": 10000.00
}
```

#### Overdraft Endpoints

```http
GET /api/financial/overdraft
PUT /api/financial/overdraft
```

Update Overdraft Example:
```json
{
  "limitAmount": 1000.00,
  "currentBalance": 500.00,
  "apr": 19.9
}
```

#### Credit Card Endpoints

```http
GET /api/financial/credit-card
PUT /api/financial/credit-card
```

Update Credit Card Example:
```json
{
  "limitAmount": 5000.00,
  "currentBalance": 1500.00,
  "apr": 21.9
}
```

## Database Schema

### users
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password_hash` - Hashed password (bcrypt)
- `created_at` - Registration timestamp
- `updated_at` - Last update timestamp

### incomes
- `id` - Primary key
- `user_id` - Foreign key to users
- `amount` - Income amount
- `category` - Income category
- `date` - Income date
- `recurring` - Boolean for recurring income
- `pay_day` - Day of month for salary (1-31)
- `notes` - Optional notes

### expenses
- `id` - Primary key
- `user_id` - Foreign key to users
- `amount` - Expense amount
- `category` - Expense category
- `date` - Expense date
- `recurring` - Boolean for recurring expense
- `notes` - Optional notes

### savings
- `id` - Primary key
- `user_id` - Foreign key to users
- `name` - Account name
- `current_balance` - Current balance
- `monthly_deposit` - Monthly deposit amount
- `goal` - Savings goal (optional)

### overdraft
- `id` - Primary key
- `user_id` - Foreign key to users (unique)
- `limit_amount` - Overdraft limit
- `current_balance` - Current balance
- `apr` - Annual Percentage Rate

### credit_card
- `id` - Primary key
- `user_id` - Foreign key to users (unique)
- `limit_amount` - Credit limit
- `current_balance` - Current balance
- `apr` - Annual Percentage Rate

## Security Features

1. **Password Hashing** - bcrypt with salt rounds
2. **JWT Tokens** - Secure authentication tokens
3. **Rate Limiting** - 100 requests per 15 minutes
4. **Helmet** - Security headers
5. **CORS** - Cross-origin protection
6. **Input Validation** - express-validator
7. **SQL Injection Prevention** - Parameterized queries
8. **Access Control** - User-specific data isolation

## Financial Calculations

### Monthly Interest
```javascript
monthlyInterest = balance × (APR / 100 / 12)
```

Example: £500 at 19.9% APR = £8.29/month

### Months to Savings Goal
```javascript
monthsToGoal = Math.ceil((goal - currentBalance) / monthlyDeposit)
```

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message description"
}
```

Common status codes:
- `400` - Bad request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (invalid token)
- `404` - Not found
- `500` - Server error

## Development

### Running Tests
```bash
npm test
```

### Database Reset
To reset the database:
```bash
# Drop and recreate
psql -U postgres -c "DROP DATABASE finance_planner;"
psql -U postgres -c "CREATE DATABASE finance_planner;"
npm run init-db
```

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use strong JWT secret (generate with `openssl rand -base64 32`)
3. Enable HTTPS
4. Configure firewall rules
5. Set up database backups
6. Use environment-specific configuration

## Future Enhancements

- Open Banking API integration
- Transaction import/export
- Recurring payment automation
- Budget alerts and notifications
- Multi-currency support
- Financial reports and analytics

## License

MIT License
