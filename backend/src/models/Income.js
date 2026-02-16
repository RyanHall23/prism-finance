import pool from '../config/database.js';

class Income {
  static async create(userId, { amount, category, date, recurring, payDay, notes, frequency, start_date, end_date, name, label }) {
    const result = await pool.query(
      `INSERT INTO incomes (user_id, amount, category, date, recurring, pay_day, notes, frequency, start_date, end_date, name, label) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
       RETURNING *`,
      [userId, amount, category, date, recurring, payDay, notes, frequency || 'monthly', start_date || date, end_date, name, label]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM incomes WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    return result.rows;
  }

  static async findById(id, userId) {
    const result = await pool.query(
      'SELECT * FROM incomes WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  }

  static async update(id, userId, data) {
    const { amount, category, date, recurring, payDay, notes, frequency, start_date, end_date, name, label } = data;
    const result = await pool.query(
      `UPDATE incomes 
       SET amount = $1, category = $2, date = $3, recurring = $4, pay_day = $5, notes = $6, 
           frequency = $7, start_date = $8, end_date = $9, name = $10, label = $11, updated_at = CURRENT_TIMESTAMP
       WHERE id = $12 AND user_id = $13 
       RETURNING *`,
      [amount, category, date, recurring, payDay, notes, frequency || 'monthly', start_date || date, end_date, name, label, id, userId]
    );
    return result.rows[0];
  }

  static async delete(id, userId) {
    await pool.query(
      'DELETE FROM incomes WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
  }

  static async getMonthlyTotal(userId) {
    const result = await pool.query(
      `SELECT 
        COALESCE(SUM(amount), 0) as total
       FROM incomes 
       WHERE user_id = $1 AND recurring = true`,
      [userId]
    );
    return parseFloat(result.rows[0].total);
  }
}

export default Income;
