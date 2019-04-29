const express = require('express');
const router  = express.Router();
const user_handler = require('../db/user_handler')

//after authentication, the user id is saved in req.user
router.get('/', (req,res)=>{
    if(req.user)
    {
      res.json({user:req.user})
    }
    else{
      res.json({user: null})
    }
})

router.get('/user_profile', function(req,res){
  user_handler.find_user_by_userid(req.user).then((row)=>{
    delete row['password']
    //console.log("found user profile, sent back")
    res.json({user_profile: row})
  }).catch((err)=>res.status(400).send(err))
})


module.exports = router;
