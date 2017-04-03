var SuccessResponse = function(res) {

    //set defaults
    this.statusCode = res.statusCode ? res.statusCode : 200;
    this.apiVersion = res.apiVersion ? res.apiVersion : "1.0";
    this.data = res.data;

    this.toJSON = function() {
        var result = {
            statusCode: this.statusCode,
            body: {
                apiVersion: this.apiVersion,
                data: this.data
            }
        };
    }
};

module.exports = SuccessResponse;