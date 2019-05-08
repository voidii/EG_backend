var email_engine = require("./email_engine")
var text_templates = require("./text_templates")
var fs = require ("fs")
var handlebars = require("handlebars")
var icon_path = "http://207.148.11.137:3000/img/logo.jpg"

var readHTMLtemplate = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};
////load all templates here:
var welcome_template = null //load welcome templates here
readHTMLtemplate(__dirname+'/html_templates/welcome.html', (err, html)=>{
  if(err){
    console.log("FATAL: "+err)
    return;
  }
  welcome_template = handlebars.compile(html);
})
var welcome_text_template = handlebars.compile(text_templates.welcome)
////////////////////////////////////////////////////////////////////////

function send_welcome_email(email_address, username){
  let html_content = welcome_template({
    username: username,
    icon_source: icon_path
  })
  let text_content = welcome_text_template({username: username})
  return new Promise((resolve, reject)=>{
    email_engine.send_email(email_address, "欢迎来到Eternal Garden Club", text_content, html_content).then(resolve).catch(err=>{console.log(err); reject(err)})
  })
}
module.exports = {send_welcome_email}
