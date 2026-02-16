import pool from '../config/database.js';

class Expense {
  static async create(userId, { amount, category, date, recurring, notes }) {
    const result = await pool.query(
      `INSERT INTO expenses (user_id, amount, category, date, recurring, notes) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [userId, amount, category, date, recurring, notes]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    return result.rows;
  }

  static async findById(id, userId) {
    const result = await pool.query(
      'SELECT * FROM expenses WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  }

  static async update(id, userId, data) {
    const { amount, category, date, recurring, notes } = data;
    const result = await pool.query(
      `UPDATE expenses 
       SET amount = $1, category = $2, date = $3, recurring = $4, notes = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 AND user_id = $7 
       RETURNING *`,
      [amount, category, date, recurring, notes, id, userId]
    );
    return result.rows[0];
  }

  static async delete(id, userId) {
    await pool.query(
      'DELETE FROM expenses WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
  }

  static async getMonthlyTotal(userId) {
    const result = await pool.query(
      `SELECT 
        COALESCE(SUM(amount), 0) as total
       FROM expenses 
       WHERE user_id = $1 AND recurring = true`,
      [userId]
    );
    return parseFloat(result.rows[0].total);
  }
}

export default Expense;
