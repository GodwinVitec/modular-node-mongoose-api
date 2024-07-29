const express = require('express');
const router = express.Router();
const TankController = require('./Controllers/TankController');

// MiddleWares
// Request Validators
const AddTankRequest = require('./Middlewares/RequestValidators/AddTankRequest');


// Request Handlers
const tankHandler = new TankController();

router.get('', tankHandler.index);
router.post('', AddTankRequest, tankHandler.addTank);

module.exports = router;