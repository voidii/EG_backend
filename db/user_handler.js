db = require('./db_handler')
hash_password = require('../utils/hash').hash_password

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

function get_all_employees(){
  sql = `SELECT * from employees`
  console.log(sql)
  return new Promise((resolve,reject)=>{
    db.all(sql ,(err, rows) =>{
      if(err) reject(err);
      //this is just getting the actual query by dumping key
      else resolve(rows)
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

function insert_user_(user_form){
  //IMPORTANT: this function is a private function for inserting user, we need to insert salty password, so use insert_user instead
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
function insert_user(user_form){
  return new Promise((resolve, reject) =>  {
    hash_password(user_form.password).then(hashed_password =>{
      console.log("hashed password: "+hashed_password)
      user_form.password = hashed_password
      return insert_user_(user_form)
    }).then(()=>{
      console.log("created a new user successfully!")
      resolve()
    }).catch((err)=>{
      reject(err)
    })
  })
}

function get_user_balance(userid){
  sql = `SELECT * FROM users WHERE userid=${userid}`
  console.log(sql)
  return new Promise((resolve, reject) =>{
    db.get(sql, [], (err, row)=>{
      if (err){
        console.log("error "+err)
        reject(err)
      }
      else{
        resolve(row.balance)
      }
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

function update_balance(userid, balance){
  sql = `UPDATE users SET balance = ${balance} WHERE userid=${userid}`
  console.log(sql)
  return new Promise((resolve, reject)=>{
    db.run(sql, (err)=>{
      if (err) {console.log(err); reject(err)}
      resolve()
    })
  })
}

module.exports = {
  username_exists,
  email_exists,
  insert_user,
  find_user_by_username,
  find_user_by_email,
  find_user_by_userid,
  update_balance,
  get_user_balance,
  get_all_employees
}
