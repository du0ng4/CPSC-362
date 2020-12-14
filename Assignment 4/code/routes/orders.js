var express = require('express');
var router = express.Router();
var fs = require('fs');
var data = require('../orders_data.json'); // get data for rsvp

router.get('/', function(req, res, next) {
  res.render('orders');
});

router.post('/', function (req, res, next) {
  order = {
    order_num: data.length + 1,
    name: req.body.name,
    phone: req.body.phone,
    order: req.body.order
  }
  data.push(order);

  fs.writeFile('orders_data.json', JSON.stringify(data), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('new order')
  });

  res.render('orders');
});

module.exports = router;
