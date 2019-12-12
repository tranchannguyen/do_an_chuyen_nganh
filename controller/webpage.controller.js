var Product = require('../models/product.model')
var Category = require('../models/category.model')
var UserG = require('../models/userG.model')
var md5 = require('md5');

module.exports.index = async function(req,res){

   var products = await Product.find();
   var categorys = await Category.find();
   res.render('index',{
      products: products,
      categorys: categorys
   });
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
 module.exports.resiger = function(req,res){
   if(req.signedCookies.userG)
	{
		res.redirect('/');
		return;
	}else console.log('not userG');
   res.render('authG/resiger');
 }
 module.exports.login = function(req,res){
   if(req.signedCookies.userG)
	{
		res.redirect('/');
		return;
	}else console.log('not userG');
   res.render('authG/signin');
 }
 module.exports.postResiger  = async function(req,res){
   req.body.pass = md5(req.body.pass);
	await UserG.insertMany(req.body);
   res.redirect('/');
 }
 module.exports.postLogin = async function(req,res){
   var email = req.body.your_email;
	var your_pass = req.body.your_pass;
	
	var userg = await UserG.find({email: email});
	if(!userg[0]){
		res.render('/login',{
			errors : ['User does not exit.']
		});
		return;
	}
	var haspassword = md5(your_pass);
	if (userg[0].pass !== haspassword) {
		// statement
		res.render('/login',{
			errors : ['Password not true.']
		});
		return;
	}
	res.cookie('userG',userg[0]._id,{signed:true});
	res.redirect('/');
 }
 module.exports.logout  = function(req,res){
   res.clearCookie('userG')
	res.redirect('/');
 }