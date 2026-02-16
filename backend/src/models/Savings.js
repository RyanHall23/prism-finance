import pool from '../config/database.js';

class Savings {
  static async create(userId, { name, currentBalance, monthlyDeposit, goal }) {
    const result = await pool.query(
      `INSERT INTO savings (user_id, name, current_balance, monthly_deposit, goal) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [userId, name, currentBalance || 0, monthlyDeposit, goal || null]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM savings WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async findById(id, userId) {
    const result = await pool.query(
      'SELECT * FROM savings WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  }

  static async update(id, userId, data) {
    const { name, currentBalance, monthlyDeposit, goal } = data;
    const result = await pool.query(
      `UPDATE savings 
       SET name = $1, current_balance = $2, monthly_deposit = $3, goal = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 AND user_id = $6 
       RETURNING *`,
      [name, currentBalance, monthlyDeposit, goal, id, userId]
    );
    return result.rows[0];
  }

  static async delete(id, userId) {
    await pool.query(
      'DELETE FROM savings WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
  }

  static async getTotalMonthlyDeposits(userId) {
    const result = await pool.query(
      `SELECT 
        COALESCE(SUM(monthly_deposit), 0) as total
       FROM savings 
       WHERE user_id = $1`,
      [userId]
    );
    return parseFloat(result.rows[0].total);
  }
}

export default Savings;
