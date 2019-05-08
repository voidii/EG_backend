//discord handler

const token = require("../../configs/app_configs").discord_token
const gift_channel_id = require("../../configs/app_configs").gift_channel_id
const Discord = require('discord.js');
const client = new Discord.Client();
var gift_channel_handler = null

client.on('ready', () => {
  console.log(`Discord Handler Logged in as ${client.user.tag}!`);
  console.log("Find these guilds and channels:")
  client.guilds.forEach((guild)=>{
    console.log("guild.name")
    guild.channels.forEach((channel)=>{
      console.log(`${channel.name} - ${channel.type} - ${channel.id}`)
    })
  })
  gift_channel_handler = client.channels.get(gift_channel_id)
});

client.login(token);

function send_on_gift_channel(text){
  if (gift_channel_handler){
    gift_channel_handler.send(text)
  }
  else {
    console.log("discord handler is not properly loaded")
  }
}

module.exports = {send_on_gift_channel}
