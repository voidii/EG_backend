const express = require('express')
const passport = require('passport');
const bodyParser = require("body-parser") //parsing http post body
const app = express()
require('./configs/passport')
require("./utils/discord/discord_engine")//need to init the engine from start
const port = require("./configs/web_configs").port
const http_protocol = require('./configs/web_configs').http_protocol
var http_redirect_server = null
//var http_protocol = 'https'

if(http_protocol == 'http'){
  var http = require('http')
  var httpServer = http.createServer(app);
}
else if (http_protocol == 'https'){
  var https = require('https')
  const https_credential = require('./configs/web_configs').https_credential
  var httpServer = https.createServer(https_credential, app)
  //redirect any http request to https request
  app1 = new express()
  app1.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/redirect.html'));
});
  app1.listen(80, function(){'redirect server running on 80 port'})
}
if(!(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test")){
  console.log("in test mode, enable CORS")
  //this is just enable CORS for the server
  const cors = require('cors') // CORS
  app.use(cors({credentials: true, origin: true}))
}
// else{
//   app.use(express.static('public'));
// }
app.use(express.static('public'));

//cookie parser:
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser())
//require('./config/passport');
const auth = require('./routes/auth');
app.use('/auth', auth);

app.use('/user', passport.authenticate('jwt', {session: false}));
const user = require('./routes/user');
app.use('/user', user);


app.use('/gift', passport.authenticate('jwt', {session: false}));
const gift = require('./routes/gifts');
app.use('/gift', gift);

const gift_history = require('./routes/gift_history');
app.use("/gift_history", gift_history)

const employees = require('./routes/employees');
app.use("/employees", employees)

httpServer.listen(port, () => console.log(`App listening on port ${port}!`))
