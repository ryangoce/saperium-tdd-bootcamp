var should = require('should');
var sinon = require('sinon');

describe('Vehicle Tests:', function() {
    describe('createVehicle', function() {
        it('should not allow an empty vin', function() {
            // TODO: Your tests go here

            var statusCode = 400;
            should(statusCode).be.equal(400, 'status code should be 400');
            //OR
            statusCode.should.be.equal(400, 'status code should be 400');

            var error = null;
            should(error).be.null();

            //spy on a function
            var callback = sinon.spy();
            callback(null, {
                statusCode: 200
            });

            //get the first call
            var calls = callback.getCall(0);

            //get the arguments to the call
            var error = calls.args[0];
            var response = calls.args[1];

            //do your should tests
            should(error).be.null();
            should(response).be.deepEqual({
                statusCode: 200
            });
            //OR
            callback.calledWith(null, {
                statusCode: 200
            }).should.be.true();

        });
    })
});