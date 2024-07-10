const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all restaurant reports
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText=`SELECT * FROM "reports";`;
    pool.query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
        console.log('error getting all restaurant reports', error);
        res.sendStatus(500);
    })
})

// GET all reports for a single facility
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText=`SELECT * FROM "reports" WHERE "facility_id"=$1;`;
    pool.query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
        console.log('error getting all restaurant reports', error);
        res.sendStatus(500);
    })
})

// GET all reports for a single user/restaurant
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText=`;`;
    pool.query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
        console.log('error getting all restaurant reports', error);
        res.sendStatus(500);
    })
})

// PUT to update reports?? 

// DELETE report?? 