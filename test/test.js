var expect = require('chai').expect;
var request = require('superagent');

it('Initial request status', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
    });
});

