var should = require('should');
var sinon = require('sinon');


describe('Vehicle Controller Tests:', function() {
    describe('createVehicle', function() {
        it('should not allow an empty body', function() {
            // MOCK usersRepository
            var vehicleRepository = {
                createVehicle: sinon.spy()
            };

            var event = {};
            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.createVehicle(event, context, callback);

            callback.calledWith(new Error('http body is required'));
        });

        it('should not allow an empty vin', function() {
            // MOCK usersRepository
            var vehicleRepository = {
                createVehicle: sinon.spy()
            };


            var event = {
                body: JSON.stringify({
                    year: 2012,
                    make: "Honda",
                    model: "Civic"
                })
            };
            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.createVehicle(event, context, callback);

            callback.calledWith(new Error('vin is required'));
        });

        it('should not allow an empty year', function() {

            should.exist(null, 'not implemented');
        });

        it('should not allow an empty make', function() {

            should.exist(null, 'not implemented');
        });

        it('should not allow an empty model', function() {

            should.exist(null, 'not implemented');
        });
    });

    describe('getYears', function() {
        it('should return paged years', function() {
            var vehicleRepository = {
                getYears: function(callback) {
                    var years = [{
                        yearId: 1990,
                        yearName: 1990
                    }, {
                        yearId: 1991,
                        yearName: 1991
                    }];

                    callback(null, years);
                }
            };

            var event = {
                queryParams: {
                    apiVersion: "1.0",
                    pageIndex: 1,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.getYears(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];

            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(200);
            should(body).be.equal({
                apiVersion: "1.0",
                data: {
                    updated: "2010-02-04T19:29:54.001Z",
                    totalItems: 100,
                    startIndex: 1,
                    itemsPerPage: 10,
                    pageIndex: 1,
                    items: [{
                        yearId: 1990,
                        yearName: 1990
                    }, {
                        yearId: 1991,
                        yearName: 1991
                    }]
                }
            });
        });

        it('should not allow an invalid version', function() {
            var vehicleRepository = {

            };

            var event = {
                queryParams: {
                    apiVersion: "99.0",
                    pageIndex: 1,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.getYears(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(400);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 400 });
            should(body.error).has.property({ message: "invalid apiVersion" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'pageIndex must be greater than or equal to 1' })
        });

        it('should not allow an invalid pageIndex', function() {
            var vehicleRepository = {

            };

            var event = {
                queryParams: {
                    apiVersion: "1.0",
                    pageIndex: 0,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.getYears(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(400);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 400 });
            should(body.error).has.property({ message: "pageIndex must be greater than or equal to 1" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'pageIndex must be greater than or equal to 1' })
        });

        it('should not allow unauthorized requests', function() {
            should.assert(false, 'not implemented');
        });

        it('should return internal server error', function() {
            var vehicleRepository = {
                getYears: function() {
                    throw new Error('unhandled error');
                }
            };

            var event = {
                queryParams: {
                    apiVersion: "1.0",
                    pageIndex: 0,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.getYears(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(500);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 500 });
            should(body.error).has.property({ message: "internal server error" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'internal server error' })
        });
    });

    describe('createYear', function() {
        it('should return the created year', function() {
            var vehicleRepository = {
                createYear: function(year, callback) {
                    callback(null, year);
                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    data: {
                        yearId: 1990,
                        yearName: 1990
                    }
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.createYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];

            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(201);
            should(body).be.equal({
                apiVersion: "1.0",
                data: {
                    yearId: 1990,
                    yearName: 1990
                }
            });
        });

        it('should not allow an invalid version', function() {
            var vehicleRepository = {

            };

            var event = {
                queryParams: {
                    apiVersion: "99.0",
                    pageIndex: 1,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.createYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(400);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 400 });
            should(body.error).has.property({ message: "invalid apiVersion" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'pageIndex must be greater than or equal to 1' })
        });

        it('should not allow an empty yearId', function() {
            var vehicleRepository = {
                createYear: function() {

                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    yearName: 2010
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.createYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(400);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 400 });
            should(body.error).has.property({ message: "yearId is required" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'yearId is required' })
        });

        it('should not allow an empty yearName', function() {
            var vehicleRepository = {
                createYear: function() {

                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    yearId: 2010
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.createYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(400);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 400 });
            should(body.error).has.property({ message: "yearName is required" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'yearName is required' })
        });

        it('should not allow duplicates', function() {
            var vehicleRepository = {
                createYear: function(year, callback) {
                    callback(null, year);
                },
                getYear: function(yearId, callback) {
                    callback(null, {
                        yearId: 1990,
                        yearName: 1990
                    });
                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    data: {
                        yearId: 1990,
                        yearName: 1990
                    }
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.createYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(409);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 409 });
            should(body.error).has.property({ message: "cannot insert duplicate resource" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'cannot insert duplicate resource' })
        });

        it('should not allow unauthorized requests', function() {
            should.assert(false, 'not implemented');
        });

        it('should return internal server error', function() {
            var vehicleRepository = {
                createYear: function() {
                    throw new Error('unhandled error');
                }
            };

            var event = {
                queryParams: {
                    apiVersion: "1.0",
                    pageIndex: 0,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.createYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(500);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 500 });
            should(body.error).has.property({ message: "internal server error" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'internal server error' })
        });
    })

    describe('deleteYear', function() {
        it('should return the delete the year', function() {
            var vehicleRepository = {
                deleteYear: function(year, callback) {
                    callback(null, year);
                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    data: {
                        yearId: 1990,
                        yearName: 1990
                    }
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.deleteYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];

            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(200);
            should(body).be.equal({
                apiVersion: "1.0",
                data: {
                    yearId: 1990,
                    yearName: 1990
                }
            });
        });

        it('should not allow an invalid version', function() {
            var vehicleRepository = {

            };

            var event = {
                queryParams: {
                    apiVersion: "99.0",
                    pageIndex: 1,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.deleteYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(400);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 400 });
            should(body.error).has.property({ message: "invalid apiVersion" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'pageIndex must be greater than or equal to 1' })
        });

        it('should return an error if year is not found', function() {
            var vehicleRepository = {
                deleteYear: function() {

                },
                getYear: function(year, callback) {
                    callback(null, null);
                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    yearName: 2010
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.deleteYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(404);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 404 });
            should(body.error).has.property({ message: "resource not found" });
            should(body.error.errors).containEql({ reason: 'NotFoundException', message: 'resource not found' })
        });

        it('should not allow unauthorized requests', function() {
            should.assert(false, 'not implemented');
        });

        it('should return internal server error', function() {
            var vehicleRepository = {
                deleteYear: function() {
                    throw new Error('unhandled error');
                }
            };

            var event = {
                queryParams: {
                    apiVersion: "1.0",
                    pageIndex: 0,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.deleteYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(500);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 500 });
            should(body.error).has.property({ message: "internal server error" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'internal server error' })
        });
    })

    describe('updateYear', function() {
        it('should return the updated the year', function() {
            var vehicleRepository = {
                updateYear: function(year, callback) {
                    callback(null, year);
                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    data: {
                        yearId: 1990,
                        yearName: 1991
                    }
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.updateYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];

            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(200);
            should(body).be.equal({
                apiVersion: "1.0",
                data: {
                    yearId: 1990,
                    yearName: 1991
                }
            });
        });

        it('should not allow an invalid version', function() {
            var vehicleRepository = {

            };

            var event = {
                queryParams: {
                    apiVersion: "99.0",
                    pageIndex: 1,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.updateYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(400);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 400 });
            should(body.error).has.property({ message: "invalid apiVersion" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'pageIndex must be greater than or equal to 1' })
        });

        it('should return an error if year is not found', function() {
            var vehicleRepository = {
                updateYear: function() {

                },
                getYear: function(year, callback) {
                    callback(null, null);
                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    yearName: 2010
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.deleteYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(404);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 404 });
            should(body.error).has.property({ message: "resource not found" });
            should(body.error.errors).containEql({ reason: 'NotFoundException', message: 'resource not found' })
        });

        it('should not allow unauthorized requests', function() {
            should.assert(false, 'not implemented');
        });

        it('should return internal server error', function() {
            var vehicleRepository = {
                updateYear: function() {
                    throw new Error('unhandled error');
                }
            };

            var event = {
                queryParams: {
                    apiVersion: "1.0",
                    pageIndex: 0,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.updateYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(500);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 500 });
            should(body.error).has.property({ message: "internal server error" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'internal server error' })
        });
    })

    describe('getYear', function() {
        it('should return the year', function() {
            var vehicleRepository = {
                getYear: function(year, callback) {
                    callback(null, year);
                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    data: {
                        yearId: 1990,
                        yearName: 1990
                    }
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.getYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];

            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(200);
            should(body).be.equal({
                apiVersion: "1.0",
                data: {
                    yearId: 1990,
                    yearName: 1990
                }
            });
        });

        it('should not allow an invalid version', function() {
            var vehicleRepository = {

            };

            var event = {
                queryParams: {
                    apiVersion: "99.0",
                    pageIndex: 1,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.getYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(400);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 400 });
            should(body.error).has.property({ message: "invalid apiVersion" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'pageIndex must be greater than or equal to 1' })
        });

        it('should return an error if year is not found', function() {
            var vehicleRepository = {
                getYear: function(year, callback) {
                    callback(null, null);
                }
            };

            var event = {
                body: {
                    apiVersion: "1.0",
                    yearName: 2010
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.getYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(404);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 404 });
            should(body.error).has.property({ message: "resource not found" });
            should(body.error.errors).containEql({ reason: 'NotFoundException', message: 'resource not found' })
        });

        it('should not allow unauthorized requests', function() {
            should.assert(false, 'not implemented');
        });

        it('should return internal server error', function() {
            var vehicleRepository = {
                getYear: function() {
                    throw new Error('unhandled error');
                }
            };

            var event = {
                queryParams: {
                    apiVersion: "1.0",
                    pageIndex: 0,
                    itemsPerPage: 2
                }
            }

            var context = {};
            var callback = sinon.spy();

            var VehicleController = require('../controllers/VehicleController');
            var vehicleController = new VehicleController(vehicleRepository)

            vehicleController.getYear(event, context, callback);

            var calls = callback.getCall(0);

            var err = calls[0];
            var result = calls[1];
            var statusCode = result.statusCode;
            var body = JSON.parse(result.body);

            should(err).be.null();
            should(statusCode).be.equal(500);
            should(body).has.property({ apiVersion: "1.0" });
            should(body.error).has.property({ code: 500 });
            should(body.error).has.property({ message: "internal server error" });
            should(body.error.errors).containEql({ reason: 'ArgumentException', message: 'internal server error' })
        });
    })
});