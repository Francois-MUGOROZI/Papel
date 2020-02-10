const { Pool } = require('pg'); // pool for interacting with database

const isProduction = process.env.NODE_ENV === 'production';
const dbString = '';

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : dbString,
  ssl: isProduction
});

module.exports = { pool };
