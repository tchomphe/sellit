var expect = require('chai').expect;
var request = require('superagent');
var server = require('../server');

var postId, userId;

describe('api tests', function () {

  describe('GET /', function(){
    it('responds with HTTP Status 200', function(done) {
      request('http://localhost:8080' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('POST /createPost', function(){
    it('responds with HTTP Status 200', function(done) {
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

  describe('POST /createUser', function(){
    it('responds with HTTP Status 200', function(done) {
      request
        .post('http://localhost:8080/createUser')
        .set('Content-Type', 'application/json')
        .send('{"name":{"first":"Son", "last":"Goku"}, "username":"superGoku", "password":"worstpassword123", "phone":"1117770000","email":"goku@gmail.com"}')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    })
  });

  describe('GET /getByTitle/:title', function(){
    it('responds with HTTP Status 200', function(done) {
      request('http://localhost:8080/getByTitle/iPhone%2034s', function(error, response, body){
        expect(response.statusCode).to.equal(200);
        console.log(response.body);
        postId = response.body._id;
        console.log('post ID: ' + postId);
        done();
      });
    });
  });

  describe('GET /userByUsername/:username', function(){
    it('responds with HTTP Status 200', function(done) {
      request.get('http://localhost:8080/userByUsername/superGoku', function(error, response, body){
        expect(response.statusCode).to.equal(200);
        console.log(response.body);
        userId = response.body._id;
        done();
      })
    })
  });

  describe('PUT /post/:id', function(){
    it('responds with HTTP Status 200', function(done){
      request
      .put('http://localhost:8080/post/'+postId)
      .set('Content-Type', 'application/json')
      .send('{"title":"New Title", "address":"New Address", "description":"New Description"}')
      .end(function(error, response, body){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('DELETE /post/:id', function(){
    it('responds with HTTP Status 200', function(done){
      request
        .delete('http://localhost:8080/post/'+postId)
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('DELETE /user/:id', function(){
    it('responds with HTTP Status 200', function(done){
      request
        .delete('http://localhost:8080/user/'+userId)
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });
});