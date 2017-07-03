// load variables needed for setup
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user'); // used for authentication

module.exports = function(passport){
    passport.use(new LocalStrategy({
        // define parameters in req.body passportjs defines as username and password
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done){
        User.findOne({ email:username }, function(err, user){
        if(err) { return done(err); }
        if(!user) { return done(new Error('User Not Found!'), false); }
        if(!user.validPassword(password)) { return done(new Error('Invalid Password!'), false); }

        return done(null, user);
        });
    }
    ));

    // set up serialization & deserialization of user their session
    passport.serializeUser(function(user, done) {
    done(null, user);
    });
    passport.deserializeUser(function(user, done) {
    done(null, user);
    });
}
