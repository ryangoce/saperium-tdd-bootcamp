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

        // TODO: Add more validations

        const params = {
            TableName: process.env.VEHICLE_TABLE,
            Item: vehicle,
            ReturnValues: 'ALL_OLD'
        };

        this.repository.put(params, (error, result) => {
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

            if (result.Attributes) {
                callback(null, {
                    statusCode: 409,
                    body: {
                        data: result.Attributes
                    }
                });
            }

            callback(null, {
                statusCode: 201
            });
        });
    };

    this.listVehicle = function() {

    };
}

module.export = VehiclesController;