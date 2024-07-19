const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET all restaurant reports (Admin Page)
router.get('/all', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "reports".*, "facility"."name" FROM "reports" JOIN "facility" ON "reports"."facility_id" = "facility"."id";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log('error getting all restaurant reports', error);
      res.sendStatus(500);
    });
});

// GET all reports for a single user
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryText = `SELECT reports.*, "facility"."name" FROM "reports" JOIN "facility" ON "reports"."facility_id" = "facility"."id" WHERE "user_id"=$1;`;
  pool
    .query(queryText, [userId])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log('error getting all restaurant reports', error);
      res.sendStatus(500);
    });
});

// GET carbon footprint for all of users facilities
router.get('/carbon-footprint', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryText = `SELECT SUM(current_carbon_footprint)
FROM "reports"
JOIN "facility" 
ON "reports"."facility_id" = "facility"."id" 
WHERE "user_id"=$1;`;
  pool
    .query(queryText, [userId])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log('error getting total carbon footprint', error);
      res.sendStatus(500);
    });
});

// GET total energy cost for all of users facilities
router.get('/energy-cost', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryText = `SELECT SUM(current_monthly_cost)
FROM "reports"
JOIN "facility" 
ON "reports"."facility_id" = "facility"."id" 
WHERE "user_id"=$1;`;
  pool
    .query(queryText, [userId])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log('error getting total monthly cost', error);
      res.sendStatus(500);
    });
});

// GET all reports for a single user/restaurant
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  // const userId = req.user.id;
  const reportId = req.params.id;
  const queryText = `WITH equipment_agg AS (
  SELECT
    e."report_id",
    array_agg(
      json_build_object(
        'description', e.description,
        'type', et.type,
        'brand', e.brand,
        'model_number', e.model_number,
        'serial_number', e."serial-number",
        'quantity', e.quantity,
        'location', el.location,
        'category', ec.category,
        'amps', e.amps,
        'volts', e."volts",
        'kW', e."kW",
        'btu', e.btu,
        'hours_used_day', e."hours_used/day",
        'energy_usage', e.energy_usage,
        'cost_per_day', e.cost_per_day,
        'cost_per_month', e.cost_per_month,
        'carbon_footprint', e.carbon_footprint,
        'notes', e.notes
      )
    ) AS equipment
  FROM
    "equipment" e
  JOIN "energy_category" ec ON ec."id" = e."category_id"
  JOIN "equipment_location" el ON el."id" = e."location_id"
  JOIN "equipment_type" et ON et."id" = e."type_id"
  GROUP BY e."report_id"
),
recommendations_agg AS (
  SELECT
    r."report_id",
    array_agg(
      
        r.recommendations
      
    ) AS recommendations
  FROM
    "recommendations" r
  GROUP BY r."report_id"
),
energy_cost_agg AS (
  SELECT
    cost."report_id",
    json_build_object(
      'electric', cost.electric,
      'natural_gas', cost.natural_gas,
      'liquid_propane', cost.liquid_propane,
      'gas_propane', cost.gas_propane,
      'heating_oil', cost.heating_oil
    ) AS energy_cost
  FROM
    "energy_cost" cost
)

SELECT
  "reports".*,
  "facility"."name",
  "facility"."user_id",
  "facility"."address",
  "user"."username",
  equipment_agg.equipment,
  recommendations_agg.recommendations,
  energy_cost_agg.energy_cost
FROM
  "reports"
JOIN "facility" ON "reports"."facility_id" = "facility"."id"
JOIN "user" ON "user"."id" = "facility"."user_id"
LEFT JOIN equipment_agg ON "reports"."id" = equipment_agg."report_id"
LEFT JOIN recommendations_agg ON "reports"."id" = recommendations_agg."report_id"
LEFT JOIN energy_cost_agg ON "reports"."id" = energy_cost_agg."report_id"
WHERE
  "reports"."id" = $1;`;
  pool
    .query(queryText, [reportId])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log('error getting all restaurant reports', error);
      res.sendStatus(500);
    });
});

// POST to add a new report
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "reports" (facility_id, current_monthly_cost, current_carbon_footprint, date_submitted)
VALUES ($1, $2, $3, $4) RETURNING id;`;
  pool
    .query(queryText, [
      req.body.facility_id,
      req.body.current_monthly_cost,
      req.body.current_carbon_footprint,
      req.body.date_submitted,
    ])
    .then((result) => {
      const reportId = result.rows[0].id;
      const { equipment, recommendations, energyCosts } = req.body;
      const { electric, naturalGas, liquidPropane, gasPropane, heatingOil } =
        energyCosts;
      const query = `Insert INTO energy_cost (
      "report_id",
      "electric",
      "natural_gas",
      "liquid_propane",
      "gas_propane"
      ") VALUES ($1, $2, $3, $4, $5)`;
      pool
        .query(query, [
          reportId,
          electric,
          naturalGas,
          liquidPropane || null,
          gasPropane || null,
        ])
        .then()
        .catch((err) => {
          console.error('Error POSTing energy costs', err);
          res.sendStatus(500);
        });

      recommendations.forEach((item) => {
        const query = `INSERT INTO "recommendations" ("report_id", "recommendations") VALUES ($1, $2);`;
        pool
          .query(query, [reportId, item])
          .then(() => console.log('Added recommendation:', item))
          .catch((err) => {
            console.error('Error POSTing equipment', err);
            res.sendStatus(500);
          });
      });

      equipment.map((item) => {
        const {
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
        } = item;
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
          .then(() => console.log('Added equipment', item.description))
          .catch((err) => {
            console.error('Error POSTing equipment', err);
            res.sendStatus(500);
          });
      });
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error POSTing a new report', error);
      res.sendStatus(500);
    });
});

// DELETE report??
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  try {
    const query = `DELETE FROM reports WHERE id=$1`;
    await pool.query(query, [req.params.id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error processing DELETE  report /${req.params.id}:`, err);
    res.sendStatus(500);
  }
});

// put to mark report as approved
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in report put, check req.body.approvedAt', req.body.approvedAt);
  console.log('in report put, check req.params.id', req.params.id);
  try {
    const queryText = `
       UPDATE "reports"
   SET "approved" = true, "approvedBy" = $1, "approvedAt" = $2
   WHERE "id"=$3;`;
    pool.query(queryText, [req.user.id, req.body.approvedAt, req.params.id]);
    res.sendStatus(200);
  } catch (error) {
    console.log('error marking report as approved', error);
    res.sendStatus(500);
  }
});

module.exports = router;
