fs = require('fs')
var http_protocol = 'http'
if (process.env.NODE_ENV == 'production')
{
  http_protocol = 'https'
  if (process.env.CERTIFICATE == 'certbot')
  {
    const key = fs.readFileSync('/etc/letsencrypt/live/domainname.com/privkey.pem', 'utf8');
    const cert = fs.readFileSync('/etc/letsencrypt/live/domainname.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/domainname.com/chain.pem', 'utf8');
    var https_credential = {
      key,cert,ca
    }
  }
  else {
    var https_credential = {
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.cert')
  }
  }
}


module.exports = {
  port : process.env.PORT || 3000,
  http_protocol,
  https_credential
}
