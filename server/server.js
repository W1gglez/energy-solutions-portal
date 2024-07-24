const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const facilityRouter = require('./routes/facility.router');
const reportRouter = require('./routes/report.router');
const equipLocationRouter = require('./routes/equip-location.router');
const energyUnitRouter = require('./routes/energy-units.router');
const energyCatRouter = require('./routes/energy-category.router');
const energyCostRouter = require('./routes/energy-cost.router');
const equipTypeRouter = require('./routes/equip-types.router');
const equipmentRouter = require('./routes/equipment.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/facility', facilityRouter);
app.use('/api/report', reportRouter);
app.use('/api/equip-location', equipLocationRouter);
app.use('/api/energy-units', energyUnitRouter);
app.use('/api/energy-categorys', energyCatRouter);
app.use('/api/energy-cost', energyCostRouter);
app.use('/api/equip-type', equipTypeRouter);
app.use('/api/equipment', equipmentRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
