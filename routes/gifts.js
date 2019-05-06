const express = require('express');
const router  = express.Router();
const gift_handler = require('../db/gift_handler')




router.get("/list", (req,res)=>{
  gift_handler.get_all_gifts().then((rows)=>{
    res.send(rows)
  }).catch((err)=>{
    res.status(400).send(err)
  })
})

router.post('/send_gift', (req,res)=>{
  console.log('handle post /gift/send_gift')
  let userid = req.user
  let gift_info = req.body
  let giftid = gift_info.giftid
  let to_id = gift_info.to_id
  let message = gift_info.message
  console.log(gift_info)
  gift_handler.send_gift(userid, giftid, to_id, message).then(()=>{res.send({status: 'success'})}).catch((err)=>{
    if (err.info =="not enough balance")
      res.status(402).send("not enough balance")
    else res.status(400).send(err)
  })
})

module.exports = router;
