const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "energy_units";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting all energy units', error);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "energy_units" ("unit") VALUES ($1);`;
  pool
    .query(queryText, [req.body.unit])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log('error POSTing new energy unit', error);
      res.sendStatus(500);
    });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  //   console.log('in unit put, check req.params.id', req.params.id);
  //   console.log('in unit put, check req.body.unit', req.body.unit);
  const queryText = `
    UPDATE "energy_units" 
    SET "unit" = $1
    WHERE "id" = $2`;
  const values = [req.body.unit, req.params.id];
  pool
    .query(queryText, values)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error updating energy unit', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const unitId = req.params.id;
  const queryText = `
    DELETE from "energy_units"  
    WHERE "energy_units"."id"=$1;`;
  pool
    .query(queryText, [unitId])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error deleting energy unit', error);
      res.sendStatus(500);
    });
});

module.exports = router;
