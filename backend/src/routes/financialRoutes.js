import express from 'express';
import { body } from 'express-validator';
import { 
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSavings,
  createSavings,
  updateSavings,
  deleteSavings,
  getFinancialOverview,
  getOverdraft,
  updateOverdraft,
  getCreditCard,
  updateCreditCard
} from '../controllers/financialController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const incomeValidation = [
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('recurring').optional().isBoolean(),
  body('payDay').optional().isInt({ min: 1, max: 31 }),
  body('notes').optional().isString()
];

const expenseValidation = [
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('recurring').optional().isBoolean(),
  body('notes').optional().isString()
];

const savingsValidation = [
  body('name').notEmpty().withMessage('Account name is required'),
  body('currentBalance').optional().isFloat({ min: 0 }),
  body('monthlyDeposit').isFloat({ min: 0 }).withMessage('Monthly deposit must be a positive number'),
  body('goal').optional().isFloat({ min: 0 })
];

const financialValidation = [
  body('limitAmount').optional().isFloat({ min: 0 }),
  body('currentBalance').optional().isFloat({ min: 0 }),
  body('apr').optional().isFloat({ min: 0, max: 100 })
];

// Overview
router.get('/overview', authenticateToken, getFinancialOverview);

// Income routes
router.get('/incomes', authenticateToken, getIncomes);
router.post('/incomes', authenticateToken, incomeValidation, createIncome);
router.put('/incomes/:id', authenticateToken, incomeValidation, updateIncome);
router.delete('/incomes/:id', authenticateToken, deleteIncome);

// Expense routes
router.get('/expenses', authenticateToken, getExpenses);
router.post('/expenses', authenticateToken, expenseValidation, createExpense);
router.put('/expenses/:id', authenticateToken, expenseValidation, updateExpense);
router.delete('/expenses/:id', authenticateToken, deleteExpense);

// Savings routes
router.get('/savings', authenticateToken, getSavings);
router.post('/savings', authenticateToken, savingsValidation, createSavings);
router.put('/savings/:id', authenticateToken, savingsValidation, updateSavings);
router.delete('/savings/:id', authenticateToken, deleteSavings);

// Overdraft routes
router.get('/overdraft', authenticateToken, getOverdraft);
router.put('/overdraft', authenticateToken, financialValidation, updateOverdraft);

// Credit card routes
router.get('/credit-card', authenticateToken, getCreditCard);
router.put('/credit-card', authenticateToken, financialValidation, updateCreditCard);

export default router;
