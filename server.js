const express = require('express')
const passport = require('passport');
const bodyParser = require("body-parser") //parsing http post body
const app = express()
require('./configs/passport')

//this is just enable CORS for the server
const cors = require('cors') // CORS
app.use(cors({credentials: true, origin: true}))
const port = 3000
//cookie parser:
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser())
//require('./config/passport');
const auth = require('./routes/auth');
app.use('/auth', auth);



// app.post('/login', function(req, res, next) {
//  // Handle the post for this route
//  info = req.body;
//  //doing a fake varification here
//  if(info.email==="123@123.com" && info.password ==="123")
//  {
//    //set cookie that expire for 7 days
//    //res.cookie('username', '123', {expire : new Date() + 7 * 24 * 60 * 60 * 1000}).json({status:'success'});
//    res.cookie('username', '123').json({status:'success'});
//  }
//  else
//  {
//    res.send(403).json({status:'fail'});
//  }
//  //fake verification done
//
//  next();
// });


app.get('/home', passport.authenticate('jwt', {session: false}), function(req, res, next){
    res.send(req.user)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
