const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//GET route to get all energy costs (Admin Page)
router.get ('/all', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "energy_cost";`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in GET energy cost', error);
            res.sendStatus(500);
        });
    });

//GET route to get all energy costs per facility
router.get ('/:id', rejectUnauthenticated, (req, res) => {
const facilityId = req.params.id;
const queryText = `SELECT * FROM "energy_cost" WHERE "facility_id" = $1;`;
pool.query(queryText, [facilityId])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Error in GET energy cost', error);
        res.sendStatus(500);
    });
});

router.post ('/', rejectUnauthenticated, (req, res) => {
    const facility = req.body;
    const queryText = `INSERT INTO "energy_cost" ("facility_id", "electric", "natural_gas", "liquid_propane", "gas_propane", "heating_oil")
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [facility.facility_id, facility.electric, facility.natural_gas, facility.liquid_propane, facility.gas_propane, facility.heating_oil])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in POST energy cost', error);
            res.sendStatus(500);
        });
    });

router.put('/:id', rejectUnauthenticated, (req, res) => {
    const costId = req.params.id;
    const facility = req.body;
    const queryText = `
      UPDATE "energy_cost" 
      SET "electric" = $1,
          "natural_gas" = $2,
          "liquid_propane" = $3,
          "gas_propane" = $4,
          "heating_oil" = $5
      WHERE "id" = $6`;
    const values = [facility.electric, facility.natural_gas, facility.liquid_propane, facility.gas_propane, facility.heating_oil, costId];
    pool
      .query(queryText, values)
      .then(() => {
        res.sendStatus(200);
        console.log('energy cost updated', costId, facility);
      })
      .catch((error) => {
        console.log('error updating energy cost', error);
        res.sendStatus(500);
      });
    });

//DELETE route to delete energy cost
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const costId = req.params.id;
    const queryText = `DELETE FROM "energy_cost" WHERE "id" = $1;`;
    pool.query(queryText, [costId])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in DELETE energy cost', error);
            res.sendStatus(500);
        });
    });
    
    module.exports = router;