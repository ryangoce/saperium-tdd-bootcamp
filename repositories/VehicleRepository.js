const uuid = require('uuid');
const dynamodb = require('./dynamodb');

var VehicleRepository = function() {

    this.createVehicle = function(vehicle, callback) {

        if (!vehicle.vin) {
            var error = new Error('vin is required');
            callback(error);
            return;
        }

        if (!vehicle.year) {
            var error = new Error('year is required');
            callback(error);
            return;
        }

        if (!vehicle.make) {
            var error = new Error('make is required');
            callback(error);
            return;
        }

        if (!vehicle.model) {
            var error = new Error('model is required');
            callback(error);
            return;
        }

        const params = {
            TableName: process.env.VEHICLE_TABLE,
            Item: vehicle
        };

        // write the todo to the database
        dynamodb.put(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(new Error('Couldn\'t create the vehicle item.'));
                return;
            }

            callback(null, result.Item);
        });
    }

    this.getVehicles = function(callback) {
        const params = {
            TableName: process.env.VEHICLE_TABLE,
            ReturnValues: 'ALL_OLD'
        };

        // fetch all todos from the database
        dynamodb.scan(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(new Error('Couldn\'t fetch vehicles.'));
                return;
            }

            callback(null, result.Items);
        });
    }
}

module.exports = VehicleRepository;