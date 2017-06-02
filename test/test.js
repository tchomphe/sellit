var expect = require('chai').expect;
var request = require('superagent');
var server = require('../server');

it('checks request status', function(done) {
    request('http://localhost:8080' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
    });
});