var express = require('express');
var fs = require('fs');
var router = express.Router();

var cred = require('../credentials.json'); // get credentials
var data = require('../orders_data.json'); // get data for rsvp



router.get('/', function (req, res, next) {
    res.render('staff_orders', {
        orders_data: data
    });
});

router.post('/', function (req, res, next) {
    var verified = false;
    for (var i = 0; i < cred.length; i++) {
        if (req.body.pass == cred[i]) {
            verified = true;
            break;
        }
    }
    if (verified === true) {
        var index = pos = data.map(function(e) { return e.order_num; }).indexOf(parseInt(req.body.order));
        data.splice(index, 1);

        fs.writeFile('orders_data.json', JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
            console.log('popped order')
        });

        res.render('staff_orders', {
            orders_data: data
        });
    } else {
        console.log("incorrect credentials");
    }

});

module.exports = router;
