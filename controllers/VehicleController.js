var VehicleController = function(repository) {

    this.repository = repository;

    this.createVehicle = function(event, context, callback) {

        if (!event.body) {
            var error = new Error('http body is required');
            callback(error);
            return;
        }

        const vehicle = JSON.parse(event.body);

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

        this.repository.createVehicle(vehicle, function(error, data) {
            if (error) {
                callback(error);
            } else {
                const response = {
                    statusCode: 200,
                    body: JSON.stringify(data),
                };
                callback(null, response);
            }
        });
    }

    this.getVehicles = function(event, context, callback) {

        var error = null;

        if (event.queryParams.pageIndex < 1) {
            error = new Error('pageIndex must be greater than or equal to 1');
        }

        if (error) {
            callback(error);
        }

        this.repository.getVehicles(function(error, data) {
            if (error) {
                callback(error);
            } else {
                const response = {
                    statusCode: 200,
                    body: JSON.stringify(data),
                };
                callback(null, response);
            }
        })
    }

    this.updateVehicle = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.deleteVehicle = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.getVehicle = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.getYears = function(event, context, callback) {

        var pageIndex = event.queryParams.pageIndex;
        var itemsPerPage = event.queryParams.itemsPerPage;

        if (pageIndex < 1) {

        }

        var okResponse = {
            statusCode: 200,
            body: {
                apiVersion: "1.0",
                error: {
                    errors: [

                    ]
                }
                data: {
                    updated: "2010-02-04T19:29:54.001Z",
                    totalItems: 100,
                    startIndex: 1,
                    itemsPerPage: 10,
                    pageIndex: 1,
                    items: data
                }
            }
        };

        var errorResponse = {
            statusCode: 400,
            body: {
                apiVersion: "1.0",
                error: {
                    errors: [

                    ]
                }
                data: {
                    updated: "2010-02-04T19:29:54.001Z",
                    totalItems: 100,
                    startIndex: 1,
                    itemsPerPage: 10,
                    pageIndex: 1,
                    items: data
                }
            }
        }

        this.repository.getYears(pageIndex, itemsPerPage, function(error, data) {
            if (error) {
                const response = {
                    statusCode: 400,
                    body: {
                        apiVersion: "1.0",
                        error: error
                    }
                };

                callback(null, response);
            } else {
                const response = {
                    statusCode: 400,
                    body: {
                        apiVersion: "1.0",
                        data: data
                    }
                };
                callback(null, response);
            }
        })

        callback();
    };

    this.getYear = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.createYear = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.updateYear = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.deleteYear = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.getMakes = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.getMake = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.createMake = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.updateMake = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.deleteMake = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.getModels = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.getModel = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.createModel = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.updateModel = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.deleteModel = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.getTrims = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.getTrim = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.createTrim = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.updateTrim = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.deleteTrim = function(event, context, callback) {
        // TODO: Implement
        callback();
    };

    this.decodeVin = function(event, context, callback) {
        // TODO: Implement
        callback();
    };
}

module.exports = VehicleController;