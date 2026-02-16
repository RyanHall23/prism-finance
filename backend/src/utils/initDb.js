import pg from 'pg';
import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

const initializeDatabase = async () => {
  // First, check if the database exists, and create it if it doesn't
  const { Client } = pg;
  const adminClient = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres', // Connect to default postgres database
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
  });

  try {
    await adminClient.connect();
    const dbName = process.env.DB_NAME || 'prism_finance';
    
    // Check if database exists
    const result = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (result.rows.length === 0) {
      console.log(`📦 Creating database '${dbName}'...`);
      await adminClient.query(`CREATE DATABASE ${dbName}`);
      console.log(`✓ Database '${dbName}' created successfully`);
    } else {
      console.log(`✓ Database '${dbName}' already exists`);
    }
  } catch (error) {
    console.error('Error checking/creating database:', error);
    throw error;
  } finally {
    await adminClient.end();
  }

  // Now connect to the actual database and create tables
  const client = await pool.connect();
  
  try {
    console.log('Starting database table initialization...');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Users table created');

    // Create incomes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS incomes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount DECIMAL(12, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        recurring BOOLEAN DEFAULT false,
        pay_day INTEGER,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Incomes table created');

    // Create expenses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount DECIMAL(12, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        recurring BOOLEAN DEFAULT false,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Expenses table created');

    // Create savings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS savings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        current_balance DECIMAL(12, 2) DEFAULT 0,
        monthly_deposit DECIMAL(12, 2) NOT NULL,
        goal DECIMAL(12, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Savings table created');

    // Create overdraft table
    await client.query(`
      CREATE TABLE IF NOT EXISTS overdraft (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        limit_amount DECIMAL(12, 2) DEFAULT 0,
        current_balance DECIMAL(12, 2) DEFAULT 0,
        apr DECIMAL(5, 2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Overdraft table created');

    // Create credit_card table
    await client.query(`
      CREATE TABLE IF NOT EXISTS credit_card (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        limit_amount DECIMAL(12, 2) DEFAULT 0,
        current_balance DECIMAL(12, 2) DEFAULT 0,
        apr DECIMAL(5, 2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Credit card table created');

    // Create indexes for better query performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_incomes_user_id ON incomes(user_id);
      CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
      CREATE INDEX IF NOT EXISTS idx_savings_user_id ON savings(user_id);
      CREATE INDEX IF NOT EXISTS idx_incomes_date ON incomes(date);
      CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
    `);
    console.log('✓ Indexes created');

    console.log('\n✅ Database initialization completed successfully!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Run initialization if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}

export default initializeDatabase;
