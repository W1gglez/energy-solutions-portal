const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//GET route to get all facilities (Admin Page)
router.get ('/all', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "facility";`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in GET facility', error);
            res.sendStatus(500);
        });
    });



// GET route to get all facilities assigned to user
router.get ('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const queryText = `SELECT * FROM "facility" WHERE "user_id" = $1;`;
    pool.query(queryText, [userId])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in GET facility', error);
            res.sendStatus(500);
        });
});


// POST route to add a new facility
router.post ('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const facility = req.body;
    const queryText = `INSERT INTO "facility" ("user_id", "name", "address", "state", "zip", "years_in_business", "building_age", "hours_of_operation", "weekly_customers", "sit_down")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    pool.query(queryText, [userId, facility.name, facility.address, facility.state, facility.zip, facility.years_in_business, facility.building_age, facility.hours_of_operation, facility.weekly_customers, facility.sit_down])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in POST facility', error);
            res.sendStatus(500);
        });

});

module.exports = router;