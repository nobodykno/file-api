const pool = require('./database');

async function testConnection() {
  try {
    console.log(process.env.DB_PASSWORD);
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully!');
    console.log(result.rows);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await pool.end();
  }
}

testConnection();


