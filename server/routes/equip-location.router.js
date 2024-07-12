const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "equipment_location";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting all restaurant reports', error);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "equipment_location" ("location") VALUES ($1);`;
  pool
    .query(queryText, [req.body.location])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log('error POSTing new equipment location', error);
      res.sendStatus(500);
    });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  // console.log('in location put, check req.params.id', req.params.id);
  // console.log('in location put, check req.body.location', req.body.location);
  const queryText = `
    UPDATE "equipment_location" 
    SET "location" = $1
    WHERE "id" = $2`;
  const values = [req.body.location, req.params.id];
  pool
    .query(queryText, values)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error updating equipment location', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const locationId = req.params.id;
  const queryText = `
    DELETE from "equipment_location" 
    WHERE "equipment_location"."id"=$1;`;
  pool
    .query(queryText, [locationId])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error deleting equipment location', error);
      res.sendStatus(500);
    });
});

module.exports = router;
