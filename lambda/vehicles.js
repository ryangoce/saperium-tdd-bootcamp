'use strict';

var VehiclesController = require('../controllers/VehiclesController.js');
var dynamoRepository = require('../repository/dynamoRepository.js');

var vController = new VehiclesController(dynamoRepository);

module.exports.create = (event, context, callback) => {
    vController.createVehicle(event, context, callback);
};

module.exports.list = (event, context, callback) => {
    vController.listVehicle(event, context, callback);
};