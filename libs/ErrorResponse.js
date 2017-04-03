var _ = require('lodash');

var ErrorResponse = function(res) {

    //set defaults and setters and getters
    this.statusCode = res.statusCode ? res.statusCode : 400;
    this.apiVersion = res.apiVersion ? res.apiVersion : "1.0";
    this.errors = res.errors ? res.errors : [];

    this.toJSON = function() {
        var result = {
            statusCode: this.statusCode,
            body: {
                apiVersion: this.apiVersion,
                error: _.map(this.errors, function(item) {
                    return {
                        reason: item.name,
                        message: item.message
                    };
                })
            }
        };
    }
};

module.exports = ErrorResponse;