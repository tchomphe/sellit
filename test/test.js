var expect = require('chai').expect;
var request = require('superagent');
var server = require('../server');

describe('api tests', function () {

  describe('GET /', function(){
    it('responds with 200 OK', function(done) {
      request('http://localhost:8080' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

});