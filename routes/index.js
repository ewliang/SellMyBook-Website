var express = require('express');
var router = express.Router();
const config = require('../config/config');
var stripe = require('stripe')(config.stripe.secretKey);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'My eBook',
    publishableKey: config.stripe.publishableKey
  });
});

router.post('/charge', function(req, res) {
  //Token Used to Securely Create Charge and Complete Payment on Server Side
  const token = req.body.stripeToken;
  //Charge The Credit Card
  const charge = stripe.charges.create({
    amount: 100,
    currency: 'usd',
    description: 'This is a charge for the eBook.',
    source: token
  }, function(err, charge) {
    //If Charge Success, Redirect to /success Page Else Display Error Page
    if(!err) {
      res.render('success');
    } else {
      res.render('error');
    }
  });
});

module.exports = router;
