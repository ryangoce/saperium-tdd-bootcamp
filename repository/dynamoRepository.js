const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// use local config if running offline
if (process.env.IS_OFFLINE) {
    AWS.config.loadFromPath('./config.json');
}

const client = new AWS.DynamoDB.DocumentClient();

var dynamoRepository = {
    scan: function(tableName, callback) {
        const params = {
            TableName: tableName,
            ReturnValues: 'ALL_OLD'
        };

        client.scan(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(error);
                return;
            }

            callback(null, result.Items);
        });
    },
    put: function(tableName, item, callback) {
        const params = {
            TableName: tableName,
            Item: item,
            ReturnValues: 'ALL_OLD'
        };

        client.put(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(error);
                return;
            }

            callback(null, result.Attributes);
        });
    },
    get: function(tableName, keyName, keyValue, callback) {
        let params = {
            TableName: tableName,
            Key: {

            },
            ReturnValues: 'ALL_OLD'
        };

        params.Key[keyName] = keyValue;
        client.get(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(error);
                return;
            }

            callback(null, result.Item);
        });
    }
}

module.exports = dynamoRepository;