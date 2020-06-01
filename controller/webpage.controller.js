var Product = require('../models/product.model')
var Category = require('../models/category.model')
var UserG = require('../models/userG.model')
var Order = require('../models/order')
var md5 = require('md5');

module.exports.index = async function(req,res){

   var products = await Product.find();
   var categorys = await Category.find();
   res.render('in',{
      products: products,
      categorys: categorys
   });
}
module.exports.contact = async function(req,res) {
   var categorys = await Category.find();
   res.render('webpage/contact',{
      categorys: categorys
   })
}
module.exports.viewAll = async function(req,res){
   var products = await Product.find();
   var categorys = await Category.find();
   res.render('webpage/allProducts',{
      products: products,
      categorys: categorys
   });
}
module.exports.viewProductByCateId = async function(req,res){
    var id = req.params.id;
    var products = await Product.find({idCate: id});
    var catein = await Category.find({_id:id});

    var categorys = await Category.find();
    res.render('webpage/allProducts',{
       products: products,
       categorys: categorys,
       catein: catein
    });
 }
 module.exports.viewProductById = async function(req,res){
    var id = req.params.id;
    var products = await Product.find({_id: id});
    var categorys = await Category.find();
    var catein = await Category.find({_id: products[0].idCate});
    res.render('webpage/singleProduct',{
       products: products,
       categorys: categorys,
       catein: catein
    });
 }
 module.exports.register = function(req,res){
   if(req.signedCookies.userG)
	{
		res.redirect('/');
		return;
	}else
      res.render('authG/register');
 }
 module.exports.login = function(req,res){
   if(req.signedCookies.userG)
	{
		res.redirect('/');
		return;
	}else console.log('not userG');
   res.render('authG/signin');
 }
 module.exports.postRegister  = async function(req,res){
      req.body.pass = md5(req.body.pass);
      req.body.avatar = "";
      req.body.phone = "";
      req.body.address = "";
      req.body.status = 'OPEN';
      await UserG.insertMany(req.body);
   res.render('authG/register',{
      success : "Register success"
   }) 
 }


 module.exports.postLogin = async function(req,res){
   var email = req.body.your_email;
	var your_pass = req.body.your_pass;
	
	var userg = await UserG.findOne({email: email});
	if(!userg){
		res.render('/login',{
			errors : ['User does not exit.']
		});
		return;
	}
	var haspassword = md5(your_pass);
	if (userg.pass !== haspassword) {
		// statement
		res.render('/login',{
			errors : ['Password not true.']
		});
		return;
	}
	res.cookie('userG',userg._id,{signed:true});
	res.redirect('/');
 }
 module.exports.logout  = function(req,res){
   res.clearCookie('userG')
	res.redirect('/');
 }
 module.exports.cart = async function(req,res){
   if(req.session.cart){
      var arrayPro = Object.values(req.session.cart.items);
      console.log(arrayPro);
      var categorys = await Category.find();
      res.render('webpage/cart',{categorys: categorys, arrayPro: arrayPro})
   }else{
      var categorys = await Category.find();
      res.render('webpage/cart',{categorys: categorys})
   }
 }
 module.exports.clear = function(req,res){
   res.clearCookie('connect.sid');
   res.redirect('/');
 }
 module.exports.checkout = async function(req,res){
   if(!req.session.cart){
      res.redirect('/cart')
   }
   var categorys = await Category.find();
      res.render('webpage/checkout',{categorys: categorys})
 }
 module.exports.postCheckout = async function(req,res){
    req.body.cart = req.session.cart;
    req.body.checked = false;
    await Order.insertMany(req.body);
    res.clearCookie('connect.sid');
    res.redirect('/');
 }
 module.exports.getProfile = async function(req,res){
   var categorys = await Category.find();
    res.render('webpage/profile',{categorys: categorys})
 }
 module.exports.postProfile = async function(req,res){
   await UserG.findByIdAndUpdate({_id:req.signedCookies.userG},{
		name:req.body.name,
		phone:req.body.phone,
		address:req.body.address,
		update_time : new Date()
	},function(err){
		if(err)	res.json(err);
		else	res.redirect('/profile');
	})
 }