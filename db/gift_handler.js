db = require('./db_handler')
const user_handler = require('./user_handler')

function get_all_gift_histories(start_idx, end_idx){
  sql = `SELECT users.username, gifts_history.time, gifts_history.id, employees.employeeid, employees.name AS employee_name, gifts.name AS gift_name, gifts.giftid, gifts.figure_path AS gift_path, gifts_history.message
   FROM gifts_history
   INNER JOIN users ON users.userid=gifts_history.from_userid
   INNER JOIN employees ON employees.employeeid=gifts_history.to_employeeid
   INNER JOIN gifts ON gifts.giftid=gifts_history.giftid
   ORDER BY time DESC LIMIT ${end_idx-start_idx} OFFSET ${start_idx}  `
  console.log(sql)
  return new Promise((resolve, reject)=>{
    db.all(sql, [], (err, rows)=>{
      if (err){
        console.log('error'+err)
        reject(err)
      }
      else{
        resolve(rows)
      }
    })
  })
}


function get_all_gifts(){
  sql = `SELECT * FROM gifts`
  console.log(sql)
  return new Promise((resolve, reject) =>{
    db.all(sql, [], (err, rows)=>{
      if (err){
        console.log("error "+err)
        reject(err)
      }
      else{
        resolve(rows)
      }
    })
  })
}
function get_gift_price(giftid){
  sql = `SELECT * FROM gifts WHERE giftid=${giftid}`
  console.log(sql)
  return new Promise((resolve, reject) =>{
    db.get(sql, [], (err, row)=>{
      if (err){
        console.log("error "+err)
        reject(err)
      }
      else{
        resolve(row.price)
      }
    })
  })
}

function get_number_of_history(){
  sql = `SELECT COUNT(*) FROM gifts_history`
  console.log(sql)
  return new Promise((resolve, reject) =>{
    db.get(sql,[], (err, row)=>{
      if(err){
        console.log(err)
        reject(err)
      }
      else{
        //console.log(row['COUNT(*)'])
        resolve(row['COUNT(*)'])
      }
    })
  })
}

// function get_user_balance(userid){
//   sql = `SELECT * FROM users WHERE userid=${userid}`
//   console.log(sql)
//   return new Promise((resolve, reject) =>{
//     db.get(sql, [], (err, row)=>{
//       if (err){
//         console.log("error "+err)
//         reject(err)
//       }
//       else{
//         resolve(row.balance)
//       }
//     })
//   })
// }

function check_and_update_balance_enough_for_gift(userid, giftid){
  return new Promise((resolve, reject) => {
    Promise.all([get_gift_price(giftid), user_handler.get_user_balance(userid)]).then((values)=>{
      let price = values[0]
      let balance = values[1]
      if(price<=balance){
        user_handler.update_balance(userid,balance-price).then(()=>{resolve(true)}).catch(err => {reject(err)})
      }
      else{
        resolve(false)
      }

    }).catch(err => {
      console.log('error '+err)
      reject(err)
    })
  })
}

function insert_gift_history(userid, giftid, to_id, message){
  sql = `INSERT INTO gifts_history (giftid, from_userid, to_employeeid, time, message) VALUES (${giftid}, ${userid}, ${to_id}, DATETIME('now'), "${message}")`
  console.log(sql)
  return new Promise((resolve, reject)=>{
    db.run(sql, (err)=>{
      if (err){
        console.log(err)
        reject(err)
      }
      else resolve()
    })
  })
}


function send_gift(userid, giftid, to_id, message){
  return new Promise ((resolve, reject)=>{
    check_and_update_balance_enough_for_gift(userid, giftid).then((valid)=>{
      if (valid){
        insert_gift_history(userid, giftid, to_id, message).then(resolve).catch(err=>{reject(err)})
      }
      else {
        console.log("no enough balance")
        reject({info:"not enough balance"})
      }
    }).catch((err)=>{
      console.log('error '+err)
      reject(err)
    })
  })
}


module.exports = {
  get_all_gift_histories,
  send_gift,
  get_number_of_history,
  get_all_gifts
}
