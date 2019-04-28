db = require('./db_handler')
hash_password = require('../util/hash').hash_password

function username_exists(username){
  sql = `SELECT EXISTS(SELECT 1 FROM users WHERE username="${username}" LIMIT 1)`
  //sql = "SELECT "+query
  return new Promise((resolve,reject)=>{
    db.get(sql ,(err, row) =>{
      if(err) reject(err);
      //this is just getting the actual query by dumping key
      key = Object.keys(row)[0]
      if(row[key]) resolve(true)
      else resolve(false)
    })
  })
}

function email_exists(email){
  sql = `SELECT EXISTS(SELECT 1 FROM users WHERE email="${email}" LIMIT 1)`
  //sql = "SELECT "+query
  console.log(sql)
  return new Promise((resolve,reject)=>{
    db.get(sql ,(err, row) =>{
      if(err) reject(err);
      //this is just getting the actual query by dumping key
      key = Object.keys(row)[0]
      if(row[key]) resolve(true)
      else resolve(false)
    })
  })
}

function insert_user(user_form){
  //this function is for insert normal user, for admin, employee or VIP, insert them as normal user and promote them later
  sql = `INSERT INTO users (username, email, password) VALUES("${user_form.username}", "${user_form.email}", "${user_form.password}")`
  console.log(sql)
  return new Promise ((resolve, reject) =>{
    db.run(sql, (err)=>{
      if (err){
        console.log(err)
      }
      else resolve()
    })
  })
}

function find_user_by_username(username){
  sql = `SELECT * FROM users WHERE username="${username}"`
  console.log(sql)
  return new Promise((resolve, reject)=>{
    db.get(sql, (err, row)=>{
      if (err){
        console.log('error'+err)
        reject(err)
      }
      else{
        resolve(row)
      }
    })
  })
}

function find_user_by_email(email){
  sql = `SELECT * FROM users WHERE email="${email}"`
  console.log(sql)
  return new Promise((resolve, reject)=>{
    db.get(sql, (err, row)=>{
      if (err){
        console.log('error'+err)
        reject(err)
      }
      else{
        resolve(row)
      }
    })
  })
}

function find_user_by_userid(userid){
  sql = `SELECT * FROM users WHERE userid="${userid}"`
  console.log(sql)
  return new Promise((resolve, reject)=>{
    db.get(sql, (err, row)=>{
      if (err){
        console.log('error'+err)
        reject(err)
      }
      else{
        resolve(row)
      }
    })
  })
}

module.exports = {
  username_exists,
  email_exists,
  insert_user,
  find_user_by_username,
  find_user_by_email,
  find_user_by_userid
}
