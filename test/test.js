var expect = require('chai').expect;
var request = require('superagent');
var server = require('../server');
var seeder = require('./seed');

// declare variables for testing
var postID, userID;
var vageta = request.agent();
var goku = request.agent();

// upload seed data
seeder.upload();

// Session-less API Tests ============================================ //
describe('Session-less API tests,', function () {

  describe('GET /', function(){
    it('responds with HTTP Status 200', function(done) {
      request('http://localhost:8080' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /postByTitle/:title', function(){
    it('responds with correct post and HTTP Status 200', function(done) {
      request('http://localhost:8080/postByTitle/' + seeder.posts[0].title, function(error, response, body){
        expect(response.body.type).to.equal(seeder.posts[0].type);
        expect(response.body.address).to.equal(seeder.posts[0].address);
        expect(response.statusCode).to.equal(200);
        postID = response.body._id;
        done();
      });
    });
  });

  describe('GET /post/:id', function(){
    it('responds with correct post and HTTP Status 200', function(done) {
      request.get('http://localhost:8080/post/'+postID, function(error, response, body){
        expect(response.body.title).to.equal(seeder.posts[0].title);
        expect(response.body.type).to.equal(seeder.posts[0].type);
        expect(response.body.address).to.equal(seeder.posts[0].address);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /userByEmail/:email', function(){
    it('responds with correct user and HTTP Status 200', function(done) {
      request.get('http://localhost:8080/userByEmail/'+seeder.users.vageta.email, function(error, response, body){
        expect(response.body._id).to.equal(seeder.users.vageta._id);
        expect(response.body.nickname).to.equal(seeder.users.vageta.nickname);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /user/:id', function(){
    it('responds with correct user and HTTP Status 200', function(done) {
      request.get('http://localhost:8080/user/'+seeder.users.vageta._id, function(error, response, body){
        expect(response.body.email).to.equal(seeder.users.vageta.email);
        expect(response.body.nickname).to.equal(seeder.users.vageta.nickname);
        expect(response.statusCode).to.equal(200);
        console.log(response.body);
        done();
      });
    });
  });
});

// Session-based API Tests (via Existing User) ======================= //
describe('Session-based API tests;', function () {

  describe('Invalid requests,', function (){
    describe('POST /createPost', function(){
      it('responds with HTTP Status 400', function(done) {
        vageta
          .post('http://localhost:8080/createPost')
          .set('Content-Type', 'multipart/form-data')
          .field('ownerID', seeder.users.vageta._id)
          .field('title', 'iCapsule S')
          .field('address', '123 Royal Way')
          .field('type', 'smartphone')
          .field('description', 'Alright condition!')
          .end(function(error, response, body){
            expect(response.statusCode).to.equal(400);
            expect(response.body.message).to.equal('Please Log In.');
            done();
          });
      });
    });

    describe('PUT /post/:id', function(){
      it('responds with HTTP Status 400', function(done){
        vageta
          .put('http://localhost:8080/post/'+seeder.posts[0]._id)
          .set('Content-Type', 'application/json')
          .send('{"title":"iNode 5s", "address":"123 Royal Way", "description":"Ok Condition. It works, deal with it."}')
          .end(function(error, response, body){
            expect(response.statusCode).to.equal(400);
            expect(response.body.message).to.equal('Please Log In.');
            done();
          });
      });
    });

    describe('DELETE /post/:id', function(){
      it('responds with HTTP Status 400', function(done){
        vageta
          .delete('http://localhost:8080/post/'+seeder.posts[0]._id)
          .end(function(error, response, body){
            expect(response.statusCode).to.equal(400);
            expect(response.body.message).to.equal('Please Log In.');
            done();
          });
      });
    });

    describe('PUT /user/:id', function(){
      it('responds with HTTP Status 400', function(done){
        vageta
          .put('http://localhost:8080/user/'+userID)
          .set('Content-Type', 'application/json')
          .send('{"email":"vagetaSuperSayan@gmail.com", "nickname":"Super Sayan Vageta"}')
          .end(function(error, response, body){
            expect(response.statusCode).to.equal(400);
            expect(response.body.message).to.equal('Please Log In.');
            done();
          });
      });
    });
  });

  describe('Vageta sign in,', function () {
    describe('GET /myAccount', function(){
      it('should redirect to / with status 400', function(done) {
        vageta
          .get('http://localhost:8080/myAccount').end(function(error, response, body){
            expect(response.statusCode).to.equal(400);
            done();
          });
      });
    });

    describe('with INVALID credentials', function() {
      it('should respond with: Invalid Password!', function(done) {
        vageta
          .post('http://localhost:8080/login')
          .type('form')
          .send({email: seeder.users.vageta.email, password: 'wrongpassword'})
          .end(function(error, response, body){
            //test for redirection URL, varifying login failure
            expect(response.body.error).to.equal('Invalid Password!');
            done();
          });
      });
    });

    describe('with INVALID credentials', function() {
      it('should respond with: User Not found!', function(done) {
        vageta
          .post('http://localhost:8080/login')
          .type('form')
          .send({email: 'hercules@gmail.com', password: seeder.users.vageta.password})
          .end(function(error, response, body){
            //test for redirection URL, varifying login failure
            expect(response.body.error).to.equal('User Not Found!');
            done();
          });
      });
    });

    describe('with VALID credentials', function() {
      it('should redirect to /create-post', function(done) {
        vageta
          .post('http://localhost:8080/login')
          .type('form')
          .send({email: seeder.users.vageta.email, password: seeder.users.vageta.password})
          .end(function(error, response, body){
            //test for redirection URL, varifying login success
            expect(response.statusCode).to.equal(200);
            expect(response.header.location).to.equal('/create-post');
            done();
          });
      });
    });

    describe('GET /myAccount', function(){
      it('should respond with happy message', function(done) {
        vageta
          .get('http://localhost:8080/myAccount').end(function(error, response, body){
            expect(response.statusCode).to.equal(200);
            expect(response.body.message).to.equal('User is logged in!');
            done();
          });
      });
    });
  });

  describe('Valid requests,', function () {
    describe('PUT /post/:id', function(){
      it('responds with HTTP Status 200', function(done){
        vageta
          .put('http://localhost:8080/post/'+postID)
          .set('Content-Type', 'application/json')
          .send('{"title":"iNode 5s", "address":"123 Royal Way", "description":"Ok Condition. It works, deal with it."}')
          .end(function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
          });
      });
    });

    describe('GET /post/:id', function(){
      it('responds with HTTP Status 200', function(done) {
        vageta.get('http://localhost:8080/post/'+postID, function(error, response, body){
          expect(response.body.title).to.equal("iNode 5s");
          expect(response.body.address).to.equal("123 Royal Way");
          expect(response.body.description).to.equal("Ok Condition. It works, deal with it.");
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });

    describe('POST /createPost', function(){
      it('responds with HTTP Status 200', function(done) {
        vageta
          .post('http://localhost:8080/createPost')
          .set('Content-Type', 'multipart/form-data')
          .field('ownerID', seeder.users.vageta._id)
          .field('title', 'iCapsule S')
          .field('address', '123 Royal Way')
          .field('type', 'smartphone')
          .field('description', 'Alright condition!')
          .attach('postImages', __dirname + '/image1.jpg')
          .attach('postImages', __dirname + '/image2.jpg')
          .end(function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
          });
      });
    });

    describe('GET /postByTitle/:title', function(){
      it('responds with HTTP Status 200', function(done) {
        vageta.get('http://localhost:8080/postByTitle/iCapsule%20S', function(error, response, body){
          postID = response.body._id;
          expect(response.body.title).to.equal("iCapsule S");
          expect(response.body.address).to.equal("123 Royal Way");
          expect(response.body.description).to.equal("Alright condition!");
          expect(response.statusCode).to.equal(200);
          console.log(response.body);
          done();
        });
      });
    });

    describe('DELETE /post/:id', function(){
      it('responds with HTTP Status 200', function(done){
        vageta
          .delete('http://localhost:8080/post/'+postID)
          .end(function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
          });
      });
    });
  });

  describe('sign out,', function(){
    describe('GET /logout', function(){
      it('should redirect to / with status of 200', function(done) {
        vageta
          .get('http://localhost:8080/logout').end(function(error, response, body){
            expect(response.statusCode).to.equal(200);
            expect(response.header.location).to.equal('/');
            done();
          });
      });
    });

    describe('GET /myAccount', function(){
      it('should redirect to / with status 400', function(done) {
        vageta
          .get('http://localhost:8080/myAccount').end(function(error, response, body){
            expect(response.statusCode).to.equal(400);
            expect(response.header.location).to.equal('/');
            done();
          });
      });
    });
  });
});

// Create & login to New User Creation =============================== //
describe('Goku session;', function () {

  describe('create account,', function(){
    describe('POST /createUser', function(){
      it('responds with HTTP Status 200', function(done) {
        goku
          .post('http://localhost:8080/createUser')
          .set('Content-Type', 'multipart/form-data')
          .field('email', 'goku@gmail.com')
          .field('password', 'kamehameha!')
          .field('phone', '1117770000')
          .end(function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
          });
      });
    });

    describe('GET /userByEmail/:email', function(){
      it('responds with HTTP Status 200', function(done) {
        goku.get('http://localhost:8080/userByEmail/goku@gmail.com', function(error, response, body){
          userID = response.body._id;
          expect(response.body.phone).to.equal(1117770000);
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });

    describe('GET /user/:id', function(){
      it('responds with HTTP Status 200', function(done) {
        goku.get('http://localhost:8080/user/'+userID, function(error, response, body){
          expect(response.body.phone).to.equal(1117770000);
          expect(response.body.email).to.equal('goku@gmail.com');
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
  });

  describe('login,', function(){
    describe('GET /myAccount', function(){
      it('should redirect to / with status 400', function(done) {
        goku
          .get('http://localhost:8080/myAccount').end(function(error, response, body){
            expect(response.statusCode).to.equal(400);
            done();
          });
      });
    });

    describe('with INVALID credentials', function() {
      it('should respond with: Invalid Password!', function(done) {
        goku
          .post('http://localhost:8080/login')
          .type('form')
          .send({email: 'goku@gmail.com', password: 'wrongpassword'})
          .end(function(error, response, body){
            //test for redirection URL, varifying login failure
            expect(response.body.error).to.equal('Invalid Password!');
            done();
          });
      });
    });

    describe('with INVALID credentials', function() {
      it('should respond with: User Not found!', function(done) {
        goku
          .post('http://localhost:8080/login')
          .type('form')
          .send({email: 'hercules@gmail.com', password: 'kamehameha!'})
          .end(function(error, response, body){
            //test for redirection URL, varifying login failure
            expect(response.body.error).to.equal('User Not Found!');
            done();
          });
      });
    });

    describe('with VALID credentials', function() {
      it('should redirect to /create-post', function(done) {
        goku
          .post('http://localhost:8080/login')
          .type('form')
          .send({email: 'goku@gmail.com', password: 'kamehameha!'})
          .end(function(error, response, body){
            //test for redirection URL, varifying login success
            expect(response.statusCode).to.equal(200);
            expect(response.header.location).to.equal('/create-post');
            done();
          });
      });
    });

    describe('GET /myAccount', function(){
      it('should respond with happy message', function(done) {
        goku
          .get('http://localhost:8080/myAccount').end(function(error, response, body){
            expect(response.statusCode).to.equal(200);
            expect(response.body.message).to.equal('User is logged in!');
            done();
          });
      });
    });
  });

});

// API Tests Requiring Session (with New User) ======================= //
describe('Goku session API tests;', function () {

  describe('PUT /user/:id', function(){
    it('responds with HTTP Status 200', function(done){
      goku
        .put('http://localhost:8080/user/'+userID)
        .set('Content-Type', 'application/json')
        .send('{"email":"gokuSuperSayan@gmail.com", "nickname":"Super Sayan Goku", "phone":"2227770000"}')
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('GET /userByEmail/:email', function(){
    it('responds with HTTP Status 200', function(done) {
      goku.get('http://localhost:8080/userByEmail/gokuSuperSayan@gmail.com', function(error, response, body){
        userID = response.body._id;
        expect(response.body.nickname).to.equal("Super Sayan Goku");
        expect(response.body.phone).to.equal(2227770000);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /user/:id', function(){
    it('responds with HTTP Status 200', function(done) {
      goku.get('http://localhost:8080/user/'+userID, function(error, response, body){
        expect(response.body.email).to.equal('gokuSuperSayan@gmail.com');
        expect(response.body.nickname).to.equal("Super Sayan Goku");
        expect(response.body.phone).to.equal(2227770000);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /logout', function(){
    it('should redirect to / with status of 200', function(done) {
      goku
        .get('http://localhost:8080/logout').end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          expect(response.header.location).to.equal('/');
          done();
        });
    });
  });

  describe('GET /myAccount', function(){
    it('should redirect to / with status 400', function(done) {
      goku
        .get('http://localhost:8080/myAccount').end(function(error, response, body){
          expect(response.statusCode).to.equal(400);
          expect(response.header.location).to.equal('/');
          done();
        });
    });
  });
});

// Cleanup ============================================================//
describe('Cleanup, and DELETE API tests', function () {

  describe('DELETE /user/:id', function(){
    it('responds with HTTP Status 200', function(done){
      request
        .delete('http://localhost:8080/user/'+userID)
        .end(function(error, response, body){
          expect(response.statusCode).to.equal(200);
          done(
            // clean seed data
            seeder.clean()
          );
        });
    });
  });
});