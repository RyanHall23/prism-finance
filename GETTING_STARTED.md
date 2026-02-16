# Getting Started with Prism Finance

## Quick Start

### Development
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the app running.

### Production Build
```bash
npm run build
npm run preview
```

## Project Structure

```
prism-finance/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── index.jsx           # Application entry point
│   ├── App.jsx             # Main app component with theme provider
│   ├── components/         # React components
│   │   ├── Dashboard.jsx           # Main dashboard with tabs
│   │   ├── Header.jsx              # Header with theme toggle
│   │   ├── OverviewCards.jsx       # Summary cards display
│   │   ├── IncomeSection.jsx       # Income management
│   │   ├── ExpenseSection.jsx      # Expense management
│   │   ├── SavingsSection.jsx      # Savings tracking
│   │   ├── OverdraftSection.jsx    # Overdraft management
│   │   └── CreditCardSection.jsx   # Credit card management
│   └── utils/
│       └── calculations.js  # Financial calculations utilities
```

## Key Features

### 1. Income Management
- Add recurring or one-off income entries
- Categories: Salary, Bonus, Freelance, Investment, Gift, Other
- Pay day logic: Automatically adjusts salary payments from weekends to previous Friday
- Track payment dates and add notes

### 2. Expense Tracking
- Multiple expense categories: Rent, Bills, Subscriptions, Utilities, Insurance, Mortgage, Other
- Recurring and one-off entries supported
- Real-time calculation of monthly totals

### 3. Savings Goals
- Create multiple savings accounts
- Track current balance and monthly deposits
- Set savings goals with automatic calculation of months to reach goal

### 4. Credit Management
- **Overdraft**: Set limit, APR, and current balance
- **Credit Card**: Set limit, APR, and current balance
- Automatic calculation of monthly interest based on APR

### 5. Theme Support
- Choose from multiple themes including Pride-themed options
- Preference persisted in localStorage

### 6. Data Persistence
All data is stored securely in PostgreSQL database with user isolation

### 7. Export Functionality
- Export all financial data to JSON format

## Calculations

### Monthly Interest Formula
```javascript
monthlyInterest = balance × (APR / 100 / 12)
```

### Months to Savings Goal
```javascript
monthsToGoal = Math.ceil((goal - currentBalance) / monthlyDeposit)
```

## Browser Compatibility

Works on all modern browsers supporting ES6+, localStorage, CSS Grid and Flexbox.

## License

MIT License
