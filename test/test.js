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

    describe('PUT /post/:id', function(){
      it('should respond with 200 OK', function(done){
        request
        .put('http://localhost:8080/post/59348b46f4b6222178aae558')
        .set('Content-Type', 'application/json')
        .send('{"title":"New Title", "address":"New Address", "description":"New Description"}')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });        
      });
    });

    describe('DELETE /post/:id', function(){
      it('should respond with 200 OK', function(done){
        request
        .delete('http://localhost:8080/post/59348b46f4b6222178aae558')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
});