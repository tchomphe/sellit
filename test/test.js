var expect = require('chai').expect;
var request = require('superagent');
var server = require('../server');

// TODO: Create JSON file used to seed data for testing
// temporary variables for storing ID's
var postID, userID;

// Homepage Tests =================================================== //
describe('User-related API tests', function () {
  describe('GET /', function(){
    it('responds with HTTP Status 200', function(done) {
      request('http://localhost:8080' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});

// User API Tests ===================================================== //
describe('User-related API tests', function () {

  describe('POST /createUser', function(){
    it('responds with HTTP Status 200', function(done) {
      request
        .post('http://localhost:8080/createUser')
        .set('Content-Type', 'multipart/form-data')
        .field('email', 'goku@gmail.com')
        .field('password', 'worstpassword123')
        .field('phone', '1117770000')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    })
  });

  describe('GET /userByEmail/:email', function(){
    it('responds with HTTP Status 200', function(done) {
      request.get('http://localhost:8080/userByEmail/goku@gmail.com', function(error, response, body){
        expect(response.statusCode).to.equal(200);
        console.log(response.body);
        userID = response.body._id;
        done();
      })
    })
  });

  describe('GET /user/:id', function(){
    it('responds with HTTP Status 200', function(done) {
      request.get('http://localhost:8080/user/'+userID, function(error, response, body){
        expect(response.statusCode).to.equal(200);
        console.log(response.body);
        done();
      })
    })
  });

  describe('PUT /user/:id', function(){
    it('responds with HTTP Status 200', function(done){
      request
        .put('http://localhost:8080/user/'+userID)
        .set('Content-Type', 'application/json')
        .send('{"email":"gokuSayan@dbz.com", "nickname":"Super Sayan"}')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });
});

// Post API Tests ===================================================== //
describe('Post-related API tests', function () {

  describe('POST /createPost', function(){
    it('responds with HTTP Status 200', function(done) {
      request
        .post('http://localhost:8080/createPost')
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'iPhone 34s')
        .field('address', 'A1B2C3')
        .field('type', 'Phone')
        .field('description', 'Test description here!')
        .attach('postImages', __dirname + '/image1.jpg')
        .attach('postImages', __dirname + '/image2.jpg')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    })
  });

  describe('GET /postByTitle/:title', function(){
    it('responds with HTTP Status 200', function(done) {
      request('http://localhost:8080/postByTitle/iPhone%2034s', function(error, response, body){
        expect(response.statusCode).to.equal(200);
        console.log(response.body);
        postID = response.body._id;
        done();
      });
    });
  });

  describe('GET /post/:id', function(){
    it('responds with HTTP Status 200', function(done) {
      request.get('http://localhost:8080/post/'+postID, function(error, response, body){
        expect(response.statusCode).to.equal(200);
        console.log(response.body);
        done();
      })
    })
  });

  describe('PUT /post/:id', function(){
    it('responds with HTTP Status 200', function(done){
      request
        .put('http://localhost:8080/post/'+postID)
        .set('Content-Type', 'application/json')
        .send('{"title":"New Title", "address":"New Address", "description":"New Description"}')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });
});

// Cleanup ============================================================//
describe('Cleanup, and DELETE API tests', function () {

  describe('DELETE /post/:id', function(){
    it('responds with HTTP Status 200', function(done){
      request
        .delete('http://localhost:8080/post/'+postID)
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('DELETE /user/:id', function(){
    it('responds with HTTP Status 200', function(done){
      request
        .delete('http://localhost:8080/user/'+userID)
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });
});