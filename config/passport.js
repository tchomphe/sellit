// load variables needed for setup
var LocalStrategy = require('passport-local').Strategy;
var User = require('../config/models/user'); // used for authentication

module.exports.defineLocalStrategy = function(passport){
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
    }));

    // set up serialization & deserialization of user's session cookie
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}

module.exports.handleLogin = function(req, res, next, passport){
    console.log('Received login Request...');
    console.log(req.body);

    if (req.body.email){ // check if an email exists on request, to avoid mongoDB user return on null search
        passport.authenticate('local', function(err, user) {
            if (err) {
                console.log('ERROR: ' + err.message);
                return res.status(400).send({error: err.message});
            }
            console.log('Authentication successful.....');

            // create new user login session
            req.login(user, function(err){
                if (err) {
                    console.log('login() ERROR: ' + err);
                    return res.status(400).send({error: err});
                }

                console.log('SUCCESS: ' + req.body.email + ' has been logged in.');
                return res.redirect('/');
            });
        })(req, res, next);
    }
    else{
        console.log('ERROR: Body email field is null');
        return res.redirect(400, '/');
    }
}