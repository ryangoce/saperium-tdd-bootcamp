var _ = require('lodash');

var VehicleController = function(repository) {

    this.repository = repository;

    this.createVehicle = function() {
        if (vehicle && !vehicle.makeId) {
            var error = new Error('makeId is required');
            errors.push(error);
        } else {
            // TODO: check for makeId. might need to use promises here
            //var error = new Error('make not found');
            //errors.push(error);
        }

        if (vehicle && !vehicle.modelId) {
            var error = new Error('modelId is required');
            errors.push(error);
        } else {
            // TODO: check for modelId. might need to use promises here
            //var error = new Error('model not found');
            //errors.push(error);
        }

        if (vehicle && !vehicle.trimId) {
            var error = new Error('trimId is required');
            errors.push(error);
        } else {
            // TODO: check for trimId. might need to use promises here
            //var error = new Error('trim not found');
            //errors.push(error);
        }

        if (vehicle && !vehicle.dealership) {
            var error = new Error('dealership is required');
            errors.push(error);
        } else {
            // TODO: check for dealership. might need to use promises here
            //var error = new Error('dealership not found');
            //errors.push(error);
        }

        if (vehicle && !vehicle.yearId && (vehicle.yearId < 1998 || vehicle.yearId > 2017)) {
            var error = new Error('invalid year. valid values are from 1998 to 2017');
            errors.push(error);
        }

        if (errors.length) {
            var errResponse = new ErrorResponse({
                statusCode: 400,
                errors: errors
            });
            callback(null, errResponse.toJSON());
        } else {
            this.repository.put(process.env.VEHICLE_TABLE, vehicle, function(error, data) {
                if (error) {

                    // TODO: check for dups
                    // if (dup) {
                    //     var error = new Error('cannot insert duplicate resource');
                    //     var errResponse = new ErrorResponse({
                    //         statusCode: 500,
                    //         errors: [error]
                    //     });
                    //     callback(null, errResponse.toJSON());
                    // }

                    var errResponse = new ErrorResponse({
                        statusCode: 500,
                        errors: [error]
                    });
                    callback(null, errResponse.toJSON());
                } else {
                    var successResponse = new SuccessResponse({
                        statusCode: 201,
                        data: data
                    });

                    callback(null, successResponse.toJSON());
                }
            });
        }
    }
}

this.getVehicles = function(event, context, callback) {
    var errors = [];
    var pageIndex = event.queryParams.pageIndex;
    var itemsPerPage = event.queryParams.itemsPerPage;

    if (pageIndex < 1) {
        const error = new Error('pageIndex must be greater than or equal to 1');
        errors.push(error);
    }

    if (errors.length) {
        var errResponse = new ErrorResponse({
            statusCode: 400,
            apiVersion: "1.0",
            errors: errors
        });
        callback(null, errResponse.toJSON());
    } else {
        this.repository.query(process.env.VEHICLE_TABLE, pageIndex, itemsPerPage, function(error, data) {
            var successResponse = new SuccessResponse({
                data: data
            });
            callback(null, successResponse.toJSON());
        })
    }
}

this.updateVehicle = function(event, context, callback) {
    var errors = new Array();
    var vehicle = null;

    var vin = event.pathParams.vin;

    if (!vin) {
        var error = new Error('missing vin in path');
        errors.push(error);
    }

    if (event.body) {
        vehicle = JSON.parse(event.body);
    }

    if (vehicle && !vehicle.vin) {
        var error = new Error('vin is required');
        errors.push(error);
    }

    if (vehicle && !vehicle.yearId) {
        var error = new Error('yearId is required');
        errors.push(error);
    } else {
        // TODO: check for yearId. might need to use promises here
        //var error = new Error('yearId not found');
        //errors.push(error);
    }

    if (vehicle && !vehicle.makeId) {
        var error = new Error('makeId is required');
        errors.push(error);
    } else {
        // TODO: check for makeId. might need to use promises here
        //var error = new Error('make not found');
        //errors.push(error);
    }

    if (vehicle && !vehicle.modelId) {
        var error = new Error('modelId is required');
        errors.push(error);
    } else {
        // TODO: check for modelId. might need to use promises here
        //var error = new Error('model not found');
        //errors.push(error);
    }

    if (vehicle && !vehicle.trimId) {
        var error = new Error('trimId is required');
        errors.push(error);
    } else {
        // TODO: check for trimId. might need to use promises here
        //var error = new Error('trim not found');
        //errors.push(error);
    }

    if (vehicle && !vehicle.dealership) {
        var error = new Error('dealership is required');
        errors.push(error);
    } else {
        // TODO: check for dealership. might need to use promises here
        //var error = new Error('dealership not found');
        //errors.push(error);
    }

    if (vehicle && !vehicle.yearId && (vehicle.yearId < 1998 || vehicle.yearId > 2017)) {
        var error = new Error('invalid year. valid values are from 1998 to 2017');
        errors.push(error);
    }

    if (errors.length) {
        var errResponse = new ErrorResponse({
            statusCode: 400,
            errors: errors
        });
        callback(null, errResponse.toJSON());
    } else {
        this.repository.update(process.env.VEHICLE_TABLE, vehicle, function(error, data) {
            if (error) {
                var errResponse = new ErrorResponse({
                    statusCode: 500,
                    errors: [error]
                });
                callback(null, errResponse.toJSON());
            } else {
                if (data) {
                    var successResponse = new SuccessResponse({
                        statusCode: 200,
                        data: data
                    });

                    callback(null, successResponse.toJSON());
                } else {
                    var error = new Error('resource not found');
                    var errResponse = new ErrorResponse({
                        statusCode: 404,
                        errors: [error]
                    });
                    callback(null, errResponse.toJSON());
                }
            }
        });
    }
};

this.deleteVehicle = function(event, context, callback) {
    var errors = new Array();

    var vin = event.pathParams.vin;

    if (!vin) {
        var error = new Error('missing yearId in path');
        errors.push(error);
    }

    if (errors.length) {
        var errResponse = new ErrorResponse({
            statusCode: 400,
            errors: errors
        });
        callback(null, errResponse.toJSON());
    } else {
        this.repository.delete(process.env.VEHICLE_TABLE, vehicle, function(error, data) {
            if (error) {
                var errResponse = new ErrorResponse({
                    statusCode: 500,
                    errors: [error]
                });
                callback(null, errResponse.toJSON());
            } else {
                if (data) {
                    var successResponse = new SuccessResponse({
                        statusCode: 200,
                        data: data
                    });

                    callback(null, successResponse.toJSON());
                } else {
                    var error = new Error('resource not found');
                    var errResponse = new ErrorResponse({
                        statusCode: 404,
                        errors: [error]
                    });
                    callback(null, errResponse.toJSON());
                }
            }
        });
    }
};

this.getVehicle = function(event, context, callback) {
    var errors = new Array();

    var vin = event.pathParams.vin;

    if (!vin) {
        var error = new Error('missing yearId in path');
        errors.push(error);
    }

    if (errors.length) {
        var errResponse = new ErrorResponse({
            statusCode: 400,
            errors: errors
        });
        callback(null, errResponse.toJSON());
    } else {
        this.repository.get(process.env.VEHICLE_TABLE, vehicle, function(error, data) {
            if (error) {
                var errResponse = new ErrorResponse({
                    statusCode: 500,
                    errors: [error]
                });
                callback(null, errResponse.toJSON());
            } else {
                if (data) {
                    var successResponse = new SuccessResponse({
                        statusCode: 200,
                        data: data
                    });

                    callback(null, successResponse.toJSON());
                } else {
                    var error = new Error('resource not found');
                    var errResponse = new ErrorResponse({
                        statusCode: 404,
                        errors: [error]
                    });
                    callback(null, errResponse.toJSON());
                }
            }
        });
    }
};

this.getYears = function(event, context, callback) {

    var errors = [];
    var pageIndex = event.queryParams.pageIndex;
    var itemsPerPage = event.queryParams.itemsPerPage;

    if (pageIndex < 1) {
        const error = new Error('pageIndex must be greater than or equal to 1');
        errors.push(error);
    }

    if (errors.length) {
        var errResponse = new ErrorResponse({
            statusCode: 400,
            apiVersion: "1.0",
            errors: errors
        });
        callback(null, errResponse.toJSON());
    } else {
        this.repository.query(process.env.YEAR_TABLE, pageIndex, itemsPerPage, function(error, data) {
            var successResponse = new SuccessResponse({
                data: data
            });
            callback(null, successResponse.toJSON());
        })
    }
};

this.getYear = function(event, context, callback) {
    // TODO: Implement
    callback();
};

this.createYear = function(event, context, callback) {
    var errors = new Array();
    var vehicle = null;

    if (!event.body) {
        var error = new Error('http body is required');
        errors.push(error);
    } else {
        vehicle = JSON.parse(event.body);
    }

    if (vehicle && !vehicle.vin) {
        var error = new Error('vin is required');
        errors.push(error);
    }

    if (vehicle && !vehicle.year) {
        var error = new Error('year is required');
        errors.push(error);
    }

    if (vehicle && !vehicle.make) {
        var error = new Error('make is required');
        errors.push(error);
    }

    if (vehicle && !vehicle.model) {
        var error = new Error('model is required');
        errors.push(error);
    }

    if (errors.length) {
        var errResponse = new ErrorResponse({
            statusCode: 400,
            errors: errors
        });
        callback(null, errResponse.toJSON());
    } else {
        this.repository.put(process.env.YEAR_TABLE, vehicle, function(error, data) {
            if (error) {
                var errResponse = new ErrorResponse({
                    statusCode: 500,
                    errors: [error]
                });
                callback(null, errResponse.toJSON());
            } else {
                var successResponse = new SuccessResponse({
                    statusCode: 201,
                    data: data
                });

                callback(null, successResponse.toJSON());
            }
        });
    }
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