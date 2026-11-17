const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./config/database');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT
        DB_NAME() AS databaseName,
        GETDATE() AS serverTime
    `);

    res.json({
      status: 'ok',
      database: result.recordset[0].databaseName,
      serverTime: result.recordset[0].serverTime,
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    res.status(503).json({ status: 'error' });
  }
});

module.exports = app;