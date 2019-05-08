send_on_gift_channel = require('./discord_engine').send_on_gift_channel
find_user_by_userid = require('../../db/user_handler').find_user_by_userid
find_employee_by_id = require('../../db/user_handler').find_employee_by_id
find_gift_by_id = require('../../db/gift_handler').find_gift_by_id

//TODO: It is NOT a good practice to use variable in promise chain like this, for this file, we only have ONE function so I leave it as it is
function send_gift_on_discord(from_userid, to_id, gift_id, message){
  find_user_by_userid(from_userid).then((user)=>{
    username = user.username
    return find_employee_by_id(to_id)
  }).then((employee)=>{
    to_name = employee.name
    return find_gift_by_id(gift_id)
  }).then((gift)=>{
    gift_name = gift.name
    send_on_gift_channel(`感谢${username}赠送${to_name}的${gift_name}，并说道:"${message}"`)
  }).catch((err)=>{
    console.log(err)
  })
}

module.exports = {
  send_gift_on_discord
}
