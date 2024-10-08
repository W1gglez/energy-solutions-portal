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
    const queryText = `INSERT INTO "facility" ("user_id", "name", "address", "state", "zip", "years_in_business", "building_age", "hours_of_operation", "weekly_customers", "sit_down", "city")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
    pool.query(queryText, [userId, facility.name, facility.address, facility.state, facility.zip, facility.years_in_business, facility.building_age, facility.hours_of_operation, facility.weekly_customers, facility.sit_down, facility.city])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in POST facility', error);
            res.sendStatus(500);
        });

});


// PUT route to update facility information
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const facilityId = req.params.id;
    const facility = req.body;
    const queryText = `UPDATE "facility" 
                       SET "name" = $1, 
                           "address" = $2, 
                           "state" = $3, 
                           "zip" = $4, 
                           "years_in_business" = $5, 
                           "building_age" = $6, 
                           "hours_of_operation" = $7, 
                           "weekly_customers" = $8, 
                           "sit_down" = $9, 
                           "city" = $10 
                       WHERE "id" = $11;`;
    pool.query(queryText, [facility.name, facility.address, facility.state, facility.zip, facility.years_in_business, facility.building_age, facility.hours_of_operation, facility.weekly_customers, facility.sit_down, facility.city, facilityId])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in PUT facility', error);
            res.sendStatus(500);
        });
});


// DELETE route to delete a facility
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const facilityId = req.params.id;
    const queryText = `DELETE FROM "facility" WHERE "id" = $1;`;
    pool.query(queryText, [facilityId])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in DELETE facility', error);
            res.sendStatus(500);
        });
});

module.exports = router;