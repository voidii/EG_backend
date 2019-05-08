///this is the low-level email engine to send arbitrary email
const mailer = require("nodemailer")
const email_address = require("../../configs/app_configs").email_address
const email_password = require("../../configs/app_configs").email_password

var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: email_address,
        pass: email_password
    }
});

send_email = function(to_adress, subject, text_content, html_content){
  let mail = {
    from: `Eternal Garden Club <${email_address}>`,
    to: to_adress,
    subject: subject,
    text: text_content,
    html: html_content
  }
  return new Promise((resolve, reject)=>{
    smtpTransport.sendMail(mail, function(error, response){
        smtpTransport.close();
        if(error){
            console.log(error);
            reject(error)
        }else{
            console.log("Message sent: " + response.message);
            resolve()
        }
    });
  })
}
module.exports = {send_email}
