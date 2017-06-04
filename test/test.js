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

  describe('POST /createPost', function(){
    it('responds with 200 OK', function(done) {
      request
        .post('http://localhost:8080/createPost')
        .set('Content-Type', 'application/json')
        .send('{"title":"iPhone 34s","address":"A1B2C3","description":"Test description here!"}')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    })
  });

  describe('GET /getByTitle/:title', function(){
    it('responds with 200 OK', function(done) {
      request('http://localhost:8080/getByTitle/iPhone%2034s', function(error, response, body){
          expect(response.statusCode).to.equal(200);
          console.log(response.body);
          done();
        });                
      });
    });
});