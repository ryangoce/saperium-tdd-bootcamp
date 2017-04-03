'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy'
    };
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports.create = (event, context, callback) => {
    const vehicle = JSON.parse(event.body);

    const params = {
        TableName: process.env.VEHICLE_TABLE,
        Item: vehicle,
        ReturnValues: 'ALL_OLD'
    };

    client.put(params, (error, result) => {
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
                body: result.Attributes
            });
        }

        callback(null, {
            statusCode: 201
        });
    });
};

module.exports.list = (event, context, callback) => {
    const params = {
        TableName: process.env.VEHICLE_TABLE,
        ReturnValues: 'ALL_OLD'
    };

    client.scan(params, (error, result) => {
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
            body: result.Items
        };

        callback(null, response);
    });
};