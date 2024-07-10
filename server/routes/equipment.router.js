const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get all equipment associated with a facility
router.get('/', async (req, res) => {
  const query = `SELECT * FROM equipment WHERE facility_id=$1`

  try {
    const response = await pool.query(query)
    res.send(response.rows)
  } catch (error) {
    console.error('Error getting equipment: ', error)
    res.sendStatus(500);
  }
});

//Post equipment to 
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

