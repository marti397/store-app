var Product = require('../models/product');
var mongoose = require('mongoose')

mongoose.connect('mongodb://chrm11:chrm11@ds229468.mlab.com:29468/store-app');


var myproducts = [];
var myprice = 100;
for(i=0; i < 10; i++){
    myprice += 10;
    //console.log(myprice);
    var mynumber = i + 1;
    var myimagePath = "/images/earringsPics/ear" + mynumber.toString() + '.jpg'
    var mytitle = 'arete ' + mynumber.toString()
    var mydescription = 'aste es arete ' + mynumber.toString() + ' desde mongo DB'
    myproducts.push(
        new Product({
            imagePath:myimagePath,
            title: mytitle,
            description:mydescription,
            price: myprice,
            category:'aretes'
        })
    )
}
var done = 0
for (x in myproducts){
    myproducts[x].save(function(err,result){
        done++;
        if (done === myproducts.length){
            mongoose.disconnect();
        }
    })
};


var myproducts = [];
var myprice = 100;
for(i=0; i < 10; i++){
    myprice += 10;
    var mynumber = i + 1;
    var myimagePath = "/images/ringsPics/ring" + mynumber.toString() + '.jpg'
    var mytitle = 'anillo ' + mynumber.toString()
    var mydescription = 'aste es anillo ' + mynumber.toString() + ' desde mongo DB'
    myproducts.push(
        new Product({
            imagePath:myimagePath,
            title: mytitle,
            description:mydescription,
            price: myprice,
            category:'anillos'
        })
    )
}
var done = 0
for (x in myproducts){
    myproducts[x].save(function(err,result){
       done++;
        if (done === myproducts.length){
            mongoose.disconnect();
        }
    })
};


var myproducts = [];
var myprice = 100;
for(i=0; i < 10; i++){
    myprice += 10;
    //console.log(myprice);
    var mynumber = i + 1;
    var myimagePath = "/images/beltsPics/belt" + mynumber.toString() + '.jpg'
    var mytitle = 'cinturon ' + mynumber.toString()
    var mydescription = 'este es cinturon ' + mynumber.toString() + ' desde mongo DB'
    myproducts.push(
        new Product({
            imagePath:myimagePath,
            title: mytitle,
            description:mydescription,
            price: myprice,
            category:'ropa'
        })
    )
}
var done = 0
for (x in myproducts){
    myproducts[x].save(function(err,result){
        done++;
        if (done === myproducts.length){
            mongoose.disconnect();
        }
    })
};


var myproducts = [];
var myprice = 100;
for(i=0; i < 10; i++){
    myprice += 10;
    //console.log(myprice);
    var mynumber = i + 1;
    var myimagePath = "/images/braceletsPics/brace" + mynumber.toString() + '.jpg'
    var mytitle = 'pulsera ' + mynumber.toString()
    var mydescription = 'esta es pulsera ' + mynumber.toString() + ' desde mongo DB'
    myproducts.push(
        new Product({
            imagePath:myimagePath,
            title: mytitle,
            description:mydescription,
            price: myprice,
            category:'pulseras'
        })
    )
}
var done = 0
for (x in myproducts){
    myproducts[x].save(function(err,result){
        done++;
        if (done === myproducts.length){
            mongoose.disconnect();
        }
    })
};


var myproducts = [];
var myprice = 100;
for(i=0; i < 10; i++){
    myprice += 10;
    //console.log(myprice);
    var mynumber = i + 1;
    var myimagePath = "/images/necklacesPics/neck" + mynumber.toString() + '.jpg'
    var mytitle = 'collar ' + mynumber.toString()
    var mydescription = 'este es collar ' + mynumber.toString() + ' desde mongo DB'
    myproducts.push(
        new Product({
            imagePath:myimagePath,
            title: mytitle,
            description:mydescription,
            price: myprice,
            category:'collares'
        })
    )
}
var done = 0
for (x in myproducts){
    myproducts[x].save(function(err,result){
        done++;
        if (done === myproducts.length){
            mongoose.disconnect();
        }
    })
};