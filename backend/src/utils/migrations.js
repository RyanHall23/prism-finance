import pool from '../config/database.js';

/**
 * Run database migrations to add new fields for recurring payments refactor
 * This adds:
 * - frequency: VARCHAR(20) - 'weekly', 'monthly', 'yearly'
 * - start_date: DATE - when recurring payment starts
 * - end_date: DATE - when recurring payment ends (optional)
 * - name: VARCHAR(255) - specific payment name (e.g., "Netflix")
 * - label: VARCHAR(100) - category/label (e.g., "Subscription")
 */
export const runMigrations = async () => {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Starting database migrations...');

    // Migration 1: Add new fields to incomes table
    await client.query(`
      ALTER TABLE incomes
      ADD COLUMN IF NOT EXISTS frequency VARCHAR(20) DEFAULT 'monthly',
      ADD COLUMN IF NOT EXISTS start_date DATE,
      ADD COLUMN IF NOT EXISTS end_date DATE,
      ADD COLUMN IF NOT EXISTS name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS label VARCHAR(100);
    `);
    console.log('✓ Incomes table migration completed');

    // Migration 2: Add new fields to expenses table
    await client.query(`
      ALTER TABLE expenses
      ADD COLUMN IF NOT EXISTS frequency VARCHAR(20) DEFAULT 'monthly',
      ADD COLUMN IF NOT EXISTS start_date DATE,
      ADD COLUMN IF NOT EXISTS end_date DATE,
      ADD COLUMN IF NOT EXISTS name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS label VARCHAR(100);
    `);
    console.log('✓ Expenses table migration completed');

    // Migration 3: Migrate existing data - set name from category for existing records
    await client.query(`
      UPDATE incomes 
      SET name = category,
          label = category,
          start_date = date
      WHERE name IS NULL;
    `);
    console.log('✓ Existing income records migrated');

    await client.query(`
      UPDATE expenses 
      SET name = category,
          label = category,
          start_date = date
      WHERE name IS NULL;
    `);
    console.log('✓ Existing expense records migrated');

    // Migration 4: Add check constraint for end_date > start_date
    await client.query(`
      ALTER TABLE incomes
      DROP CONSTRAINT IF EXISTS incomes_end_date_check;
      
      ALTER TABLE incomes
      ADD CONSTRAINT incomes_end_date_check 
      CHECK (end_date IS NULL OR end_date > start_date);
    `);
    console.log('✓ Income date validation constraint added');

    await client.query(`
      ALTER TABLE expenses
      DROP CONSTRAINT IF EXISTS expenses_end_date_check;
      
      ALTER TABLE expenses
      ADD CONSTRAINT expenses_end_date_check 
      CHECK (end_date IS NULL OR end_date > start_date);
    `);
    console.log('✓ Expense date validation constraint added');

    console.log('\n✅ All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Run migrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations()
    .then(() => {
      console.log('Migration script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export default runMigrations;
