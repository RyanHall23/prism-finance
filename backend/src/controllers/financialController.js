import Income from '../models/Income.js';
import Expense from '../models/Expense.js';
import Savings from '../models/Savings.js';
import Financial from '../models/Financial.js';
import RecurringPaymentService from '../services/RecurringPaymentService.js';

// Income Controllers
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.findByUserId(req.user.id);
    
    // If month parameter is provided, generate recurring entries for that month
    if (req.query.month) {
      const targetMonth = new Date(req.query.month);
      const generatedIncomes = RecurringPaymentService.generateForMonth(incomes, targetMonth);
      return res.json({ incomes: generatedIncomes });
    }
    
    res.json({ incomes });
  } catch (error) {
    console.error('Get incomes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createIncome = async (req, res) => {
  try {
    // Validate recurring payment data
    if (req.body.recurring) {
      const validation = RecurringPaymentService.validate(req.body);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.errors.join(', ') });
      }
    }
    
    const income = await Income.create(req.user.id, req.body);
    res.status(201).json({ 
      message: 'Income created successfully',
      income 
    });
  } catch (error) {
    console.error('Create income error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateIncome = async (req, res) => {
  try {
    // Validate recurring payment data
    if (req.body.recurring) {
      const validation = RecurringPaymentService.validate(req.body);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.errors.join(', ') });
      }
    }
    
    const income = await Income.update(req.params.id, req.user.id, req.body);
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    res.json({ 
      message: 'Income updated successfully',
      income 
    });
  } catch (error) {
    console.error('Update income error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    await Income.delete(req.params.id, req.user.id);
    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    console.error('Delete income error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Expense Controllers
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findByUserId(req.user.id);
    
    // If month parameter is provided, generate recurring entries for that month
    if (req.query.month) {
      const targetMonth = new Date(req.query.month);
      const generatedExpenses = RecurringPaymentService.generateForMonth(expenses, targetMonth);
      return res.json({ expenses: generatedExpenses });
    }
    
    res.json({ expenses });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createExpense = async (req, res) => {
  try {
    // Validate recurring payment data
    if (req.body.recurring) {
      const validation = RecurringPaymentService.validate(req.body);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.errors.join(', ') });
      }
    }
    
    const expense = await Expense.create(req.user.id, req.body);
    res.status(201).json({ 
      message: 'Expense created successfully',
      expense 
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateExpense = async (req, res) => {
  try {
    // Validate recurring payment data
    if (req.body.recurring) {
      const validation = RecurringPaymentService.validate(req.body);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.errors.join(', ') });
      }
    }
    
    const expense = await Expense.update(req.params.id, req.user.id, req.body);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ 
      message: 'Expense updated successfully',
      expense 
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.delete(req.params.id, req.user.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Savings Controllers
export const getSavings = async (req, res) => {
  try {
    const savings = await Savings.findByUserId(req.user.id);
    res.json({ savings });
  } catch (error) {
    console.error('Get savings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createSavings = async (req, res) => {
  try {
    const savings = await Savings.create(req.user.id, req.body);
    res.status(201).json({ 
      message: 'Savings account created successfully',
      savings 
    });
  } catch (error) {
    console.error('Create savings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateSavings = async (req, res) => {
  try {
    const savings = await Savings.update(req.params.id, req.user.id, req.body);
    if (!savings) {
      return res.status(404).json({ error: 'Savings account not found' });
    }
    res.json({ 
      message: 'Savings account updated successfully',
      savings 
    });
  } catch (error) {
    console.error('Update savings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteSavings = async (req, res) => {
  try {
    await Savings.delete(req.params.id, req.user.id);
    res.json({ message: 'Savings account deleted successfully' });
  } catch (error) {
    console.error('Delete savings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Financial overview and calculations
export const getFinancialOverview = async (req, res) => {
  try {
    const monthlyIncome = await Income.getMonthlyTotal(req.user.id);
    const monthlyExpenses = await Expense.getMonthlyTotal(req.user.id);
    const monthlySavings = await Savings.getTotalMonthlyDeposits(req.user.id);
    
    const overdraft = await Financial.getOrCreateOverdraft(req.user.id);
    const creditCard = await Financial.getOrCreateCreditCard(req.user.id);
    
    const overdraftInterest = Financial.calculateMonthlyInterest(
      parseFloat(overdraft.current_balance),
      parseFloat(overdraft.apr)
    );
    
    const creditCardInterest = Financial.calculateMonthlyInterest(
      parseFloat(creditCard.current_balance),
      parseFloat(creditCard.apr)
    );
    
    const remainingBalance = monthlyIncome - monthlyExpenses - monthlySavings;

    res.json({
      monthlyIncome,
      monthlyExpenses,
      monthlySavings,
      remainingBalance,
      overdraft: {
        ...overdraft,
        monthlyInterest: overdraftInterest,
        availableCredit: parseFloat(overdraft.limit_amount) - parseFloat(overdraft.current_balance)
      },
      creditCard: {
        ...creditCard,
        monthlyInterest: creditCardInterest,
        availableCredit: parseFloat(creditCard.limit_amount) - parseFloat(creditCard.current_balance)
      }
    });
  } catch (error) {
    console.error('Get financial overview error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Overdraft Controllers
export const getOverdraft = async (req, res) => {
  try {
    const overdraft = await Financial.getOrCreateOverdraft(req.user.id);
    res.json({ overdraft });
  } catch (error) {
    console.error('Get overdraft error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateOverdraft = async (req, res) => {
  try {
    const overdraft = await Financial.updateOverdraft(req.user.id, req.body);
    res.json({ 
      message: 'Overdraft updated successfully',
      overdraft 
    });
  } catch (error) {
    console.error('Update overdraft error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Credit Card Controllers
export const getCreditCard = async (req, res) => {
  try {
    const creditCard = await Financial.getOrCreateCreditCard(req.user.id);
    res.json({ creditCard });
  } catch (error) {
    console.error('Get credit card error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateCreditCard = async (req, res) => {
  try {
    const creditCard = await Financial.updateCreditCard(req.user.id, req.body);
    res.json({ 
      message: 'Credit card updated successfully',
      creditCard 
    });
  } catch (error) {
    console.error('Update credit card error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
