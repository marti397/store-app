var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/product/:id/detail',function(req,res,next){
  var productID = req.params.id;
  Product.findById(productID).exec(function(err,result){
    if(err){return next(err)}
    res.render('productDetail', {oneProduct:result});
  })
})

router.get('/product/:id', function(req, res, next){
  var successMsg = req.flash('success')[0];
  var productCategory = req.params.id;
  if(productCategory === 'todo'){
    Product.find({}).exec(function(err,results){
      if(err){ return next(err); }
      res.render('products', {allProducts:productCategory, products: results, successMsg: successMsg, noMessage: !successMsg  });
      //res.render('products', {allProducts:productCategory, products: results})
    })
  } else{
    Product.find({category:productCategory}).exec(function(err,results){
      if(err){ return next(err); }
      res.render('products', {allProducts:productCategory, products: results})
    })
  }
});

router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId).exec(function(err, product){
    if (err){return res.redirect('/');}
    cart.add(product, product.id);
    req.session.cart = cart;
    var myroute = '/product/' + product.category
    res.redirect(myroute)
  });
});

router.get('/reduce/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  if (Object.keys(req.session.cart.items).length === 0){
    req.session.cart = undefined;
  }
  res.redirect('/shopping-cart')
})
//add by One
router.get('/add/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.addByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart')
})

router.get('/remove/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  if (Object.keys(req.session.cart.items).length === 0){
    req.session.cart = undefined;
  }
  res.redirect('/shopping-cart')
})

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shopping-cart', {products:null})
  }
  var cart = new Cart(req.session.cart);
  res.render('shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice})
})

router.get('/checkout', isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart')
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('checkout',{total: cart.totalPrice, errMsg: errMsg, noErrors: !errMsg});
})

router.post('/checkout', isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart')
  }

  var stripe = require("stripe")(
    "sk_test_zm6Fa5KELRS1ERYX19A7LvXz"
  );
  var cart = new Cart(req.session.cart);

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    if(err){
      req.flash('error', err.message)
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function(err, result){
      req.flash('success', 'Successful Purchase!');
      req.session.cart = null;
      res.redirect('/product/todo');
      // asynchronously called
    })
  });
});
module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
      return next();
  }
  req.session.oldUrl = req.url
  res.redirect('/user/login');
}