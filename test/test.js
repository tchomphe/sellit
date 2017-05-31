var expect = require('chai').expect;
var request = require('superagent');
var server = require('../server');

describe('Start up server for testing', function () {
  before(function () {
    server.listen(3000);
  });

  after(function () {
    server.close();
  });
});

it('Initial request status', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
    });
});