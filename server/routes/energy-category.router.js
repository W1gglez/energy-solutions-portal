const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "energy_category";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting all energy categories', error);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "energy_category" ("category") VALUES ($1);`;
  pool
    .query(queryText, [req.body.category])
    .then((result) => {
      res.send(result.rows[0]).status(201);
    })
    .catch((error) => {
      console.log('error POSTing new energy category', error);
      res.sendStatus(500);
    });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
    UPDATE "energy_category" 
    SET "category" = $1
    WHERE "id" = $2`;
  const values = [req.body.category, req.params.id];
  pool
    .query(queryText, values)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error updating energy category', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const unitId = req.params.id;
  const queryText = `
    DELETE from "energy_category"  
    WHERE "energy_category"."id"=$1;`;
  pool
    .query(queryText, [unitId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error deleting energy category', error);
      res.sendStatus(500);
    });
});

module.exports = router;
