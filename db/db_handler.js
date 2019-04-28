const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(__dirname+'/data.db', sqlite3.OPEN_READWRITE,(err)=>{
  if (err){
    console.error(err.message);
    return;
  }
  console.log('connected to database successfully');
});

module.exports = db;
