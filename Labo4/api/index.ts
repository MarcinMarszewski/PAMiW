const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.options('/api/items', async (req, res) => {
  res.status(204).end();
});

app.options('/api/items/:id', async (req, res) => {
  res.status(204).end();
});


app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/items', async (req, res) => {
  const { name, price } = req.body;
  if(price <= 0) return res.status(400).json({ error: 'Price must be greater than 0' });
  if(!name || !price) return res.status(400).json({ error: 'Name and price are required' });
  try {
    const result = await pool.query(
      'INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *',
      [name, Number(price)]
    );
    res.status(201).json(result.rows[0]);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
	if(price <= 0) return res.status(400).json({ error: 'Price must be greater than 0' });
  if(!name || !price) return res.status(400).json({ error: 'Name and price are required' });
  try {
    const result = await pool.query(
      'UPDATE items SET name = $1, price = $2 WHERE id = $3 RETURNING *',
      [name, price, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(200).json({id: Number(id)});
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});