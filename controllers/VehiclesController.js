var VehiclesController = function(repository) {
    this.repository = repository;

    this.createVehicle = function(event, context, callback) {
        const vehicle = JSON.parse(event.body);

        if (!vehicle.year) {
            callback(null, {
                statusCode: 400,
                body: {
                    error: "year is required"
                }
            });
            return;
        }

        this.repository.put(process.env.VEHICLE_TABLE, vehicle, (error, data) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(null, {
                    statusCode: 500,
                    body: {
                        error: "Cannot create vehicle"
                    }
                });
                return;
            }

            if (data) {
                callback(null, {
                    statusCode: 409,
                    body: {
                        data: data
                    }
                });
            }

            callback(null, {
                statusCode: 201
            });
        });
    };

    this.listVehicles = function(callback) {
        this.repository.scan(process.env.VEHICLE_TABLE, (error, data) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(null, {
                    statusCode: 500,
                    body: {
                        error: "Cannot get vehicles"
                    }
                });
                return;
            }

            const response = {
                statusCode: 200,
                body: {
                    data: data
                }
            };

            callback(null, response);
        });
    };

    this.getVehicle = function(vin, callback) {
        this.repository.get(process.env.VEHICLE_TABLE, "vin", vin, (error, data) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(null, {
                    statusCode: 500,
                    body: {
                        errors: [{
                            message: "An internal server error has occurred",
                            code: 22
                        }]
                    }
                });
                return;
            }

            if (!data) {
                callback(null, {
                    statusCode: 404,
                    body: {
                        errors: [{
                            message: "VIN not found",
                            code: 20
                        }]
                    }
                });
            }

            callback(null, {
                statusCode: 200,
                body: data
            });
        });
    };

}

module.exports = VehiclesController;