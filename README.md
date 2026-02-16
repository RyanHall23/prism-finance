# Prism Finance

A modern full-stack personal finance management application built with React, Material-UI, Node.js, and PostgreSQL. Secure multi-user application with JWT authentication and dynamic theming.

## Features

- 🔐 **Multi-User Authentication** - Secure JWT-based login system
- 📊 **Dashboard Overview** - Visual summary of your financial status with real-time calculations
- 💰 **Income Tracking** - Track salaries, bonuses, and other income sources with recurring and one-off entries
- 💸 **Expense Management** - Manage subscriptions, bills, rent, and other expenses with smart categorization
- 🏦 **Savings Goals** - Track multiple savings accounts with monthly deposits and goal progress
- 🔴 **Overdraft Tracking** - Monitor overdraft usage with APR-based interest calculations
- 💳 **Credit Card Management** - Track credit card balances and projected interest
- 👤 **Account Management** - Update profile, change password, delete account
- 🌈 **Pride Theme System** - Choose from multiple beautiful themes including Pride-themed options
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔒 **Secure** - Encrypted passwords, protected API endpoints, HTTPS ready

## Tech Stack

### Frontend
- React 18 with Vite
- Material-UI 5
- JWT authentication

### Backend
- Node.js with Express
- PostgreSQL database
- bcrypt password hashing
- JWT tokens
- express-validator

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RyanHall23/prism-finance.git
cd prism-finance
```

2. **Backend Setup:**
```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Initialize database
npm run init-db

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

3. **Frontend Setup:**
```bash
# From root directory
npm install

# Configure environment
cp .env.example .env
# VITE_API_URL should point to backend (default: http://localhost:5000/api)

# Start frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

### Database Configuration

Edit `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_planner
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secure_random_secret
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:3000
```

## Usage

### Create Account
1. Click "Sign Up" on the login page
2. Enter username, email, and password
3. You'll be automatically logged in

### Adding Financial Data
1. Navigate to tabs: Income, Expenses, Savings, Overdraft, Credit Card
2. Fill in the forms with your financial information
3. Data is automatically saved to the database

### Account Settings
1. Click your username in the top right
2. Select "Account Settings"
3. Update profile, change password, or delete account

## API Documentation

See [backend/README.md](backend/README.md) for complete API documentation including:
- All endpoints
- Request/response examples
- Authentication flow
- Database schema

## Security Features

1. **Password Security** - bcrypt hashing with 10 salt rounds
2. **JWT Authentication** - Secure token-based sessions
3. **Rate Limiting** - 100 requests per 15 minutes
4. **Helmet** - Security headers
5. **CORS** - Protected cross-origin requests
6. **Input Validation** - All inputs validated
7. **SQL Injection Prevention** - Parameterized queries
8. **Access Control** - Users can only access their own data

## Financial Calculations

### Monthly Interest
```
monthlyInterest = balance × (APR / 100 / 12)
```

Example: £500 at 19.9% APR = £8.29/month

### Months to Savings Goal
```
monthsToGoal = ⌈(goal - currentBalance) / monthlyDeposit⌉
```

### Pay Day Logic
- If pay day falls on Saturday: Adjusted to Friday
- If pay day falls on Sunday: Adjusted to Friday
- Otherwise: Uses specified day

## Development

### Project Structure
```
prism-finance/
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── config/      # Database & config
│   │   ├── models/      # Data models
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth & validation
│   │   └── utils/       # Helpers
│   └── package.json
├── src/                  # React frontend
│   ├── components/      # UI components
│   ├── pages/          # Login, Register, Account
│   ├── services/       # API integration
│   └── utils/          # Helper functions
├── package.json
└── vite.config.js
```

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
npm test
```

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Enable HTTPS
4. Configure database with SSL
5. Set up database backups
6. Use process manager (PM2)

### Frontend
1. Build production bundle: `npm run build`
2. Serve from CDN or static hosting
3. Configure API URL for production

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prism_finance
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

## Recent Updates

### 🎨 Pride Theme System
Prism Finance now includes a beautiful theme system with multiple options:
- **Light & Dark** - Classic professional themes
- **Trans Pride** - Light blue, pink, and white color scheme
- **Bi Pride** - Magenta, purple, and blue color scheme  
- **Rainbow Pride** - Full spectrum rainbow theme
- **Non-Binary** - Yellow, white, purple, and grey theme
- **Lesbian Pride** - Orange and pink color scheme

All themes are WCAG contrast compliant and professionally designed for fintech use.

### 💰 Enhanced Recurring Payments
- **Dynamic Frequency** - Set payments to weekly, monthly, or yearly
- **Start & End Dates** - Define when recurring payments begin and end
- **Name & Label System** - Separate payment names (e.g., "Netflix") from labels (e.g., "Subscription")
- **Smart Generation** - Recurring payments are calculated dynamically per month
- **Backward Compatible** - Existing data remains functional

### 🏗 Improved Architecture
- Clean service layer for business logic
- All calculations handled server-side
- Modular controller/model/service structure
- Comprehensive API for recurring payment management

## Future Enhancements

- Open Banking API integration
- Transaction import/export (CSV/OFX)
- Budget alerts and notifications
- Multi-currency support
- Financial reports and charts
- Mobile app (React Native)
- Two-factor authentication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details
