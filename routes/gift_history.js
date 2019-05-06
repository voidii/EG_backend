const express = require('express');
const router  = express.Router();
const gift_handler = require('../db/gift_handler')

router.get('/', (req,res)=>{
  gift_handler.get_all_gift_histories(req.query.start_idx, req.query.end_idx).then(gifts => {

    res.send(gifts)
  }).catch(
    (err)=>{
      res.status(400).send(err)
  })
})

router.get('/length', (req,res)=>{
  gift_handler.get_number_of_history().then(length => {
    res.send({length:length})
  }).catch(
    (err)=>{
      res.status(400).send(err)
  })
})
module.exports = router;
