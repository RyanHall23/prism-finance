import pool from '../config/database.js';

class Financial {
  static async getOrCreateOverdraft(userId) {
    let result = await pool.query(
      'SELECT * FROM overdraft WHERE user_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      result = await pool.query(
        'INSERT INTO overdraft (user_id) VALUES ($1) RETURNING *',
        [userId]
      );
    }
    
    return result.rows[0];
  }

  static async updateOverdraft(userId, { limitAmount, currentBalance, apr }) {
    const result = await pool.query(
      `INSERT INTO overdraft (user_id, limit_amount, current_balance, apr)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id) 
       DO UPDATE SET 
         limit_amount = $2,
         current_balance = $3,
         apr = $4,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userId, limitAmount, currentBalance, apr]
    );
    return result.rows[0];
  }

  static async getOrCreateCreditCard(userId) {
    let result = await pool.query(
      'SELECT * FROM credit_card WHERE user_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      result = await pool.query(
        'INSERT INTO credit_card (user_id) VALUES ($1) RETURNING *',
        [userId]
      );
    }
    
    return result.rows[0];
  }

  static async updateCreditCard(userId, { limitAmount, currentBalance, apr }) {
    const result = await pool.query(
      `INSERT INTO credit_card (user_id, limit_amount, current_balance, apr)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id) 
       DO UPDATE SET 
         limit_amount = $2,
         current_balance = $3,
         apr = $4,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userId, limitAmount, currentBalance, apr]
    );
    return result.rows[0];
  }

  // Calculate monthly interest
  static calculateMonthlyInterest(balance, apr) {
    if (balance <= 0 || apr <= 0) return 0;
    const monthlyRate = apr / 100 / 12;
    return balance * monthlyRate;
  }

  // Calculate months to savings goal
  static calculateMonthsToGoal(currentBalance, monthlyDeposit, goal) {
    if (!goal || goal <= currentBalance) return 0;
    if (monthlyDeposit <= 0) return null;
    return Math.ceil((goal - currentBalance) / monthlyDeposit);
  }
}

export default Financial;
