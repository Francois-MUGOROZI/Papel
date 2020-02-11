import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';
const connStr = 'postgres://postgres:special@localhost:5432/postgres';
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connStr
});

export default pool;
