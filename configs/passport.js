//const passport = require("passport");
const passportJWT = require("passport-jwt");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secret = require("./app_configs").jwtSecret;

user_handler = require("../db/user_handler")
verify_hash = require("../utils/hash").verify_hash
function findOne(email, password){
  return new Promise(function(resolve, reject){
    user_handler.find_user_by_email(email).then(user =>{
      if (user){
          verify_hash(password, user.password).then((result)=>{
            if(result) resolve(user.userid)
            else resolve(null)
          })
      }
      else{
        resolve(null)
      }
    })
  })
}

//module.exports = function(passport){
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        return findOne(email, password)
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
                   //the cb function takes three parameter (error, user, info), if there is an error, resolve error
                   //then if there is no user, it considers auth failed, if there is a user, then auth succeed
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: req => req.cookies.jwttoken,
        secretOrKey   : secret
    },
    function (jwtPayload, done) {
        //find the user in db if needed
        if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
      }
      return done(null, jwtPayload);

    }
));
