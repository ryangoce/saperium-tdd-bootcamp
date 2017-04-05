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

    this.listVehicles = function(event, context, callback) {
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
}

module.exports = VehiclesController;