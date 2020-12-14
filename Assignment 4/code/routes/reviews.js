var express = require('express');
var fs = require('fs');
var router = express.Router();
var data = require('../reviews_data.json'); // get data for reviews

router.get('/', function (req, res, next) {
  res.render('reviews', {
    review_data: data
  });
});

router.post('/', function (req, res, next) {
  new_review = {
    name: req.body.username,
    rating: parseInt(req.body.rating),
    review: req.body.review
  }
  data.push(new_review);

  fs.writeFile('reviews_data.json', JSON.stringify(data), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('new review')
  });

  res.render('reviews', {
    review_data: data
  });
});

module.exports = router;
