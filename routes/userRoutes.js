var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Cart = require('../models/cart');

var Order = require('../models/order');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next){
    Order.find({user:req.user},function(err, orders){
        if(err){
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', {orders: orders, userInfo:req.user.email});
    });
});
router.get('/logout', isLoggedIn, function(req, res, next){
    req.logout();
    res.redirect('/product/todo')
});
router.use('/', notLoggedIn, function(req, res, next){
    next();
});
router.get('/userselect', function(req, res, next){
    res.render('user/userselect');
});
router.get('/signup', function(req,res,next){
    var messages = req.flash('error')
    res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  })
router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next){
    if (req.session.oldUrl){
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/user/profile');
    }
});
router.get('/login', function(req, res, next){
    var messages = req.flash('error')
    res.render('user/login',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post('/login', passport.authenticate('local.login', {
    failureRedirect: '/user/login',
    failureFlash: true
}), function(req, res, next){
    if (req.session.oldUrl){
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/user/profile');
    }
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
function notLoggedIn(req, res, next){
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;