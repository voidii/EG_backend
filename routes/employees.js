const express = require('express');
const router  = express.Router();
const user_handler = require('../db/user_handler')

router.get('/list', function(req,res){
  user_handler.get_all_employees().then(rows =>{
    res.send(rows)
  }).catch(err =>{
    console.log(err)
    res.status(400).send(err)
  })
})

module.exports = router;
