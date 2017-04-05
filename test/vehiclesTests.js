var should = require('should');
var sinon = require('sinon');
var VehiclesController = require('../controllers/VehiclesController');

describe('Vehicle Tests:', function() {
    describe('createVehicle', function() {
        it('should not allow an empty vin', function() {
            // TODO: Your tests go here

            var statusCode = 400;
            should(statusCode).be.equal(400, 'status code should be 400');
            //OR
            statusCode.should.be.equal(400, 'status code should be 400');

            var error = null;
            should(error).be.null();

            //spy on a function
            var callback = sinon.spy();
            callback(null, {
                statusCode: 200
            });

            //get the first call
            var calls = callback.getCall(0);

            //get the arguments to the call
            var error = calls.args[0];
            var response = calls.args[1];

            //do your should tests
            should(error).be.null();
            should(response).be.deepEqual({
                statusCode: 200
            });
            //OR
            callback.calledWith(null, {
                statusCode: 200
            }).should.be.true();

        });
    })

    describe('getVehicle', function() {
        it('should return the vehicle', function() {
            // TODO: Your tests go here

            var vehicle = {
                vin: '33434343DFDERRLL',
                year: 2012,
                make: "Honda",
                model: "Jazz",
                dealership: "123AutoSale"
            }

            var repository = {
                get: function(tableName, keyName, keyValue, callback) {
                    callback(null, vehicle);
                }
            };

            var vController = new VehiclesController(repository);

            var callback = sinon.spy();
            vController.getVehicle(vehicle.vin, callback);

            //get the first call
            var calls = callback.getCall(0);

            //get the arguments to the call
            var error = calls.args[0];
            var response = calls.args[1];

            //do your should tests
            should(error).be.null();
            should(response).be.deepEqual({
                statusCode: 200,
                body: vehicle
            });

        });

        it('shoud return 404 on non-existing vin', function() {
            var vehicle = {
                vin: 'NOTEXISTINGVIN',
                year: 2012,
                make: "Honda",
                model: "Jazz",
                dealership: "123AutoSale"
            }

            var repository = {
                get: function(tableName, keyName, keyValue, callback) {
                    //just return null error and data
                    callback();
                }
            };

            var vController = new VehiclesController(repository);

            var callback = sinon.spy();
            vController.getVehicle(vehicle.vin, callback);

            //get the first call
            var calls = callback.getCall(0);

            //get the arguments to the call
            var error = calls.args[0];
            var response = calls.args[1];

            //do your should tests
            should(error).be.null();
            should(response).be.deepEqual({
                statusCode: 404,
                body: {
                    errors: [{
                        message: "VIN not found",
                        code: 20
                    }]
                }
            });

        });

        it('shoud return 500 or internal server error when there is an error in the repository', function() {
            var vehicle = {
                vin: 'NOTEXISTINGVIN',
                year: 2012,
                make: "Honda",
                model: "Jazz",
                dealership: "123AutoSale"
            }

            var repository = {
                get: function(tableName, keyName, keyValue, callback) {
                    callback(new Error('Internal server error'));
                }
            };

            var vController = new VehiclesController(repository);

            var callback = sinon.spy();
            vController.getVehicle(vehicle.vin, callback);

            //get the first call
            var calls = callback.getCall(0);

            //get the arguments to the call
            var error = calls.args[0];
            var response = calls.args[1];

            //do your should tests
            should(error).be.null();
            should(response).be.deepEqual({
                statusCode: 500,
                body: {
                    errors: [{
                        message: "An internal server error has occurred",
                        code: 22
                    }]
                }
            });

        });
    })
});