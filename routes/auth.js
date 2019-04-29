const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const secret = require("../configs/app_configs").jwtSecret;
const user_handler = require('../db/user_handler')

var cookieParser = require('cookie-parser');
router.use(cookieParser());
//use cookie parser to save login information on frontend

/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user,
                info    : info
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, secret);
           res.cookie('jwttoken', token, {expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
           res.json({username: user, status:'success'});
        });
    })(req, res);
});

router.get("/logout", (req, res, next)=>{
  res.clearCookie("jwttoken");
  res.json({status:'success'});
})

router.get('/username_exist', function (req, res){
    user_handler.username_exists(req.query.username).then(ans => {
      res.send(ans)
    })
})

router.get('/email_exist', function (req, res){
    user_handler.email_exists(req.query.email).then(ans => {
      res.send(ans)
    })
})

router.post('/register', function(req,res){
  console.log("receive registration requests")
  user_form = req.body
  Promise.all([
    user_handler.username_exists(user_form.username),
    user_handler.email_exists(user_form.email)
  ]).then(results =>{
    if (results[0] || results[1])
    {
      res.status(400)
      res.send({message:'username/email already registered'})
      return {then: function() {}}; //a trick for jumping out of promise chain
    }
    else return user_handler.insert_user(user_form)
  }).then(()=>{res.send('success')})
})

module.exports = router;
