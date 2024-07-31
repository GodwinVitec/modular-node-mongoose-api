const express = require('express');
const router = express.Router();
const TankController = require('./Controllers/TankController');

// MiddleWares
// Requests
const AddTankRequest = require('./Middlewares/RequestValidators/AddTankRequest');

// Request Validators
// const addTankRequestValidator = (new AddTankRequest()).validate;
const UpdateTankRequest = require('./Middlewares/RequestValidators/UpdateTankRequest');


// Request Handlers
const tankHandler = new TankController();

// Routes
router.get('', tankHandler.index);
router.post('', AddTankRequest, tankHandler.addTank);
router.put('/:id', UpdateTankRequest, tankHandler.updateTank);
router.delete('/:id', tankHandler.destroyTank);

module.exports = router;