var express = require('express');
var fs = require('fs');
var router = express.Router();

var data = require('../rsvp_data.json'); // get data for rsvp
var cred = require('../credentials.json'); // get credentials

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('staff_rsvp', {
    rsvp_data: data
  });
});

router.post('/', function (req, res, next) {
  var verified = false;
  for (var i = 0; i < cred.length; i++) {
    if (req.body.pass == cred[i]) verified = true;
  }
  if (verified === true) {
    data.shift();
    for (var i = 0; i < data.length; i++) {
      data[i].position = i + 1;
    }
    fs.writeFile('rsvp_data.json', JSON.stringify(data), function writeJSON(err) {
      if (err) return console.log(err);
      console.log('popped waitlist')
    });
  
    res.render('staff_rsvp', {
      rsvp_data: data
    });
  } else {
    console.log("incorrect credentials");
  }

});

module.exports = router;