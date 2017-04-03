'use strict';
const VehicleRepository = require('../repositories/VehicleRepository');
const VehicleController = require('../controllers/VehicleController');

const vRepository = new VehicleRepository();
const vController = new VehicleController(vRepository);

module.exports.list = (event, context, callback) => {
    vController.getVehicles(event, context, callback);
};