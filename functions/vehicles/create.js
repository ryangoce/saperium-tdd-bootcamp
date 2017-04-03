'use strict';

const VehicleRepository = require('../repositories/VehicleRepository');
const VehicleController = require('../controllers/VehicleController');

const vRepository = new VehicleRepository();
const vController = new VehicleController(vRepository);

module.exports.create = (event, context, callback) => {
    vController.createVehicle(event, context, callback);
};