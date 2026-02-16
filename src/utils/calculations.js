/**
 * Get the nearest working day for a given date
 * If the date falls on a weekend, move to the previous Friday
 */
export const getNearestWorkingDay = (year, month, day) => {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  
  // If Saturday (6), move to Friday (-1 day)
  if (dayOfWeek === 6) {
    date.setDate(date.getDate() - 1);
  }
  // If Sunday (0), move to Friday (-2 days)
  else if (dayOfWeek === 0) {
    date.setDate(date.getDate() - 2);
  }
  
  return date;
};

/**
 * Calculate projected interest for overdraft or credit card
 * @param {number} balance - Current balance
 * @param {number} apr - Annual Percentage Rate
 * @returns {number} Monthly interest
 */
export const calculateMonthlyInterest = (balance, apr) => {
  if (balance <= 0 || apr <= 0) return 0;
  const monthlyRate = apr / 100 / 12;
  return balance * monthlyRate;
};

/**
 * Calculate total monthly income including recurring items
 */
export const calculateTotalMonthlyIncome = (incomes) => {
  return incomes.reduce((total, income) => {
    if (income.recurring || isInCurrentMonth(income.date)) {
      return total + parseFloat(income.amount || 0);
    }
    return total;
  }, 0);
};

/**
 * Calculate total monthly expenses including recurring items
 */
export const calculateTotalMonthlyExpenses = (expenses) => {
  return expenses.reduce((total, expense) => {
    if (expense.recurring || isInCurrentMonth(expense.date)) {
      return total + parseFloat(expense.amount || 0);
    }
    return total;
  }, 0);
};

/**
 * Check if a date is in the current month
 */
export const isInCurrentMonth = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

/**
 * Format currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

/**
 * Export data to JSON
 */
export const exportToJSON = (data, filename) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
