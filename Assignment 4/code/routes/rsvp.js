var express = require('express');
var fs = require('fs');
var router = express.Router();

var data = require('../rsvp_data.json'); // get data for rsvp

router.get('/', function (req, res, next) {
  res.render('rsvp', {
    rsvp_data: data
  });
});

router.post('/', function (req, res, next) {
  person = {
    position: data.length + 1,
    name: req.body.name,
    size: req.body.size,
    number: req.body.phone
  }
  data.push(person);

  fs.writeFile('rsvp_data.json', JSON.stringify(data), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('new reservation');
  });

  res.render('rsvp', {
    rsvp_data: data
  });
});

module.exports = router;
