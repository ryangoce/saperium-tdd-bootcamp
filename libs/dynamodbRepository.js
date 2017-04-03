'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
    // search items with paging
    query: function(tableName, pageIndex, itemsPerPage, filters, callback) {
        const params = {
            TableName: tableName,
            ReturnValues: 'ALL_OLD'
        };

        client.scan(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(new Error('Couldn\'t fetch vehicles.'));
                return;
            }

            callback(null, result.Items);
        });
    },

    //get an item by key
    get: function(tableName, itemKey, callback) {

        // TODO: implement
        const params = {
            TableName: tableName,
            ReturnValues: 'ALL_OLD'
        };

        client.get(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(new Error('Couldn\'t fetch vehicles.'));
                return;
            }

            callback(null, result.Items);
        });
    },

    // put or add an item
    put: function(tableName, item, callback) {
        const params = {
            TableName: tableName,
            Item: item
        };

        client.put(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(new Error('Couldn\'t create the vehicle item.'));
                return;
            }

            callback(null, result.Item);
        });
    },

    // update an item
    update: function(tableName, itemKey, item, callback) {

        // TODO: Implement updateItem
        const params = {
            TableName: tableName,
            Item: item
        };

        client.update(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(new Error('Couldn\'t create the vehicle item.'));
                return;
            }

            callback(null, result.Item);
        });
    },

    delete: function(tableName, itemKey, item, callback) {

        // TODO: Implement delete
        const params = {
            TableName: tableName,
            Item: item
        };

        client.delete(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(new Error('Couldn\'t create the vehicle item.'));
                return;
            }

            callback(null, result.Item);
        });
    }
};