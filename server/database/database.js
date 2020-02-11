import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production'; // check if we are in production or development
const connStr = 'postgres://postgres:special@localhost:5432/postgres'; // local database connection
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connStr
});

export default pool;
