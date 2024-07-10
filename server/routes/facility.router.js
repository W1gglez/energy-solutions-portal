const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// GET route to get all facilities
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

module.exports = router;