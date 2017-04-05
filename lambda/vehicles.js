'use strict';

var VehiclesController = require('../controllers/VehiclesController.js');
var dynamoRepository = require('../repository/dynamoRepository.js');

var vController = new VehiclesController(dynamoRepository);

module.exports.create = (event, context, callback) => {
    vController.createVehicle(event.body, callback);
};

module.exports.list = (event, context, callback) => {
    vController.listVehicles(callback);
};

module.exports.get = (event, context, callback) => {
    var vin = event.pathParameters.vin;
    vController.getVehicle(vin, callback);
};