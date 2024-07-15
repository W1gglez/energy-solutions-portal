const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "equipment_type";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting all equipment locations', error);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "equipment_type" ("type") VALUES ($1);`;
  pool
    .query(queryText, [req.body.type])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error POSTing new equipment location', error);
      res.sendStatus(500);
    });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
    UPDATE "equipment_type" 
    SET "type" = $1
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
  const typeId = req.params.id;
  const queryText = `
    DELETE from "equipment_type" 
    WHERE "id"=$1;`;
  pool
    .query(queryText, [typeId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error deleting equipment location', error);
      res.sendStatus(500);
    });
});

module.exports = router;
