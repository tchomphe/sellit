var expect = require('chai').expect;
var request = require('superagent');
var server = require('../server');

// TODO: Create JSON file used to seed data for testing
// temporary variables for storing ID's
var postID, userID;

describe('API tests', function () {

  describe('GET /', function(){
    it('responds with HTTP Status 200', function(done) {
      request('http://localhost:8080' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

// Create //
// -------//

  describe('POST /createPost', function(){
    it('responds with HTTP Status 200', function(done) {
      request
        .post('http://localhost:8080/createPost')
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'iPhone 34s')
        .field('address', 'A1B2C3')
        .field('description', 'Test description here!')
        .attach('postImage', __dirname + '/image1.jpg')
        .attach('postImage', __dirname + '/image2.jpg')
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
        .set('Content-Type', 'multipart/form-data')
        .field('firstName', 'Son')
        .field('lastName', 'Goku')
        .field('username', 'superGoku')
        .field('password', 'worstpassword123')
        .field('phone', '1117770000')
        .field('email', 'goku@gmail.com')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    })
  });

// Retrieve //
// -------- //

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

  describe('GET /userByUsername/:username', function(){
    it('responds with HTTP Status 200', function(done) {
      request.get('http://localhost:8080/userByUsername/superGoku', function(error, response, body){
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

// Update //
// -------//

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

  describe('PUT /user/:id', function(){
    it('responds with HTTP Status 200', function(done){
      request
        .put('http://localhost:8080/user/'+userID)
        .set('Content-Type', 'application/json')
        .send('{"name":{"first":"Just", "last":"Raditz"}, "username":"trueSaiyan"}')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

// Delete //
// -------//

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