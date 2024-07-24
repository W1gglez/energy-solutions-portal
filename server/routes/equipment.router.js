const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
  const {
    reportId,
    description,
    typeId,
    brand,
    modelNumber,
    serialNumber,
    qty,
    locationId,
    categoryId,
    amps,
    volts,
    watts,
    kW,
    btu,
    hoursPerDay,
    energyUsage,
    costPerDay,
    costPerMonth,
    carbonFootprint,
    notes,
  } = req.body;
  const query = `INSERT INTO "equipment" (
  "report_id",
  "description",
  "type_id",
  "brand",
  "model_number",
  "serial-number",
  "quantity",
  "location_id",
  "category_id",
  "amps",
  "volts",
  "watts",
  "kW",
  "btu",
  "hours_used/day",
  "energy_usage", -- in kWh
  "cost_per_day",
  "cost_per_month",
  "carbon_footprint", --in ton/year
  "notes")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20);
  `;
  pool
    .query(query, [
      reportId,
      description,
      typeId,
      brand,
      modelNumber,
      serialNumber,
      qty,
      locationId,
      categoryId,
      amps,
      volts,
      watts,
      kW,
      btu,
      hoursPerDay,
      energyUsage,
      costPerDay,
      costPerMonth,
      carbonFootprint,
      notes,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Error POSTing equipment', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const {
    reportId,
    description,
    typeId,
    brand,
    modelNumber,
    serialNumber,
    qty,
    locationId,
    categoryId,
    amps,
    volts,
    watts,
    kW,
    btu,
    hoursPerDay,
    energyUsage,
    costPerDay,
    costPerMonth,
    carbonFootprint,
    notes,
  } = req.body;
  const query = `UPDATE "equipment"
SET
  "report_id" = $1,
  "description" = $2,
  "type_id" = $3,
  "brand" = $4,
  "model_number" = $5,
  "serial-number" = $6,
  "quantity" = $7,
  "location_id" = $8,
  "category_id" = $9,
  "amps" = $10,
  "volts" = $11,
  "watts" = $12,
  "kW" = $13,
  "btu" = $14,
  "hours_used/day" = $15,
  "energy_usage" = $16,
  "cost_per_day" = $17,
  "cost_per_month" = $18,
  "carbon_footprint" = $19,
  "notes" = $20
WHERE
  id = $21;

      `;
  pool
    .query(query, [
      reportId,
      description,
      typeId,
      brand,
      modelNumber,
      serialNumber,
      qty,
      locationId,
      categoryId,
      amps,
      volts,
      watts,
      kW,
      btu,
      hoursPerDay,
      energyUsage,
      costPerDay,
      costPerMonth,
      carbonFootprint,
      notes,
      req.params.id,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Error POSTing equipment', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', async (req, res) => {
  const query = `DELETE FROM equipment WHERE id=$1;`;
  const id = req.params.id;
  try {
    await pool.query(query, [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error DELETEing equipment ${id}:`, err);
  }
});

module.exports = router;
