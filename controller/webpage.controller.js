var Product = require('../models/product.model')
var Category = require('../models/category.model')
const Cart = require("../models/cart");
const Order = require("../models/order");
var UserG = require('../models/userG.model')
var md5 = require('md5');
var recentlyViewed = []

module.exports.index = async function(req,res){
   var products = await Product.find();
   var smartphone = await Product.find({idCate: "5de12f6c4c37031ee087e5da"})
   var laptop = await Product.find({idCate: "5ed5766606854e12286197d6"})
   var smartphonenew = smartphone.sort(function(a, b) {
      a = new Date(a.dateAdded);
      b = new Date(b.dateAdded);
      return a>b ? -1 : a<b ? 1 : 0;
  }).slice(0,20);
   var laptopnew = laptop.sort(function(a, b) {
      a = new Date(a.dateAdded);
      b = new Date(b.dateAdded);
      return a>b ? -1 : a<b ? 1 : 0;
  }).slice(0,20);
   var featured = products.sort(function(a, b) {
      a = new Date(a.dateAdded);
      b = new Date(b.dateAdded);
      return a>b ? -1 : a<b ? 1 : 0;
  }).slice(0,20);
  var productSale = (products.filter(function(pro){
     return pro.isSale.status == true
  })).slice(0,20)
   var categorys = await Category.find();
   res.render('in',{
      featured:featured,
      laptopnew:laptopnew,
      smartphonenew: smartphonenew,
      categorys: categorys,
      recentlyViewed: recentlyViewed,
      productSale:productSale
   });
}
module.exports.search = async function(req,res){
   var page = parseInt(req.query.page) || 1
   var q = req.query.q;
   var perpage = 25
   let start = (page - 1) * perpage;
   let end =  page * perpage
    
   var product = await Product.find()
   var products = product.slice(start,end).filter(function(pro){
      return  pro.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
   })
   let numberpages = Math.ceil(parseFloat(products.length/perpage))
   let arrpages = []
   for(let i = 1; i<=numberpages; i++){
      arrpages.push(i)
   }
   let brands = []
   for(pro of products){
      if(brands.indexOf(pro.brand) <= -1) {
         brands.push(pro.brand);
      }
   }
   let countProduct  = products.length;
   var categorys = await Category.find();
   res.render('webpage/shop',{
      products: products,
      categorys: categorys,
      countProduct: countProduct,
      title: 'Search Product',
      brands:brands,
      arrpages:arrpages
   });
}
module.exports.blog = async function(req,res) {
   var categorys = await Category.find();
   res.render('webpage/blog',{
      categorys: categorys
   })
}
module.exports.contact = async function(req,res) {
   var categorys = await Category.find();
   res.render('webpage/contact',{
      categorys: categorys
   })
}
module.exports.viewAll = async function(req,res){
   var page = parseInt(req.query.page) || 1
   var perpage = 25
   let start = (page - 1) * perpage;
   let end =  page * perpage
    
   var product = await Product.find()
   let numberpages = Math.ceil(parseFloat(product.length/perpage))
   let arrpages = []
   for(let i = 1; i<=numberpages; i++){
      arrpages.push(i)
   }
   var products = product.slice(start,end)
   let brands = []
   for(pro of products){
      if(brands.indexOf(pro.brand) <= -1) {
         brands.push(pro.brand);
      }
   }
   let countProduct  = products.length;
   var categorys = await Category.find();
   res.render('webpage/shop',{
      products: products,
      categorys: categorys,
      countProduct: countProduct,
      title: 'All Product',
      brands:brands,
      arrpages:arrpages
   });
}

module.exports.brand = async function(req,res) {
   let namebrand  = req.params.brand;
   var product = await Product.find();
   products = product.filter(prduct => prduct.brand == namebrand)
   let brands = []
   for(pro of product){
      if(brands.indexOf(pro.brand) <= -1) {
         brands.push(pro.brand);}
   }
   let countProduct  = products.length;
   var categorys = await Category.find();
   res.render('webpage/shop',{
      products: products,
      categorys: categorys,
      countProduct: countProduct,
      title: namebrand,
      brands:brands
   });
}
module.exports.viewProductByCateId = async function(req,res){
    var id = req.params.id;
    var page = parseInt(req.query.page) || 1
    var perpage = 25
    let start = (page - 1) * perpage;
    let end =  page * perpage
    var product = await Product.find({idCate: id})
    var products = product.splice(start,end)
    let numberpages = Math.ceil(product.length/perpage)
    let arrpages = []
    for(let i = 1; i<=numberpages; i++){
       arrpages.push(i)
    }
    var catein = await Category.findOne({_id:id});
    let title = catein.name;
    var categorys = await Category.find();
    let brands = []
    let countProduct  = products.length;
   for(pro of products){
      if(brands.indexOf(pro.brand) <= -1) {
         brands.push(pro.brand);}
   }
    res.render('webpage/shop',{
       products: products,
       categorys: categorys,
       countProduct: countProduct,
       title: title,
       brands:brands,
       arrpages:arrpages
    });
 }
 module.exports.viewProductById = async function(req,res){
    var id = req.params.id;
    var products = await Product.findOne({_id: id})
    var categorys = await Category.find();
    var catein = await Category.findOne({_id: products.idCate});
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
	}else 
   res.render('authG/signin');
 }
 module.exports.postRegister  = async function(req,res){
      req.body.pass = md5(req.body.pass);
      req.body.avatar = "";
      req.body.phone = "";
      req.body.address = "";
      req.body.status = 'IN_PROGRES';
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

//  exports.addToCart = (req, res, next) => {
//    var prodId = req.params.productId;
//    var cart = new Cart(req.session.cart ? req.session.cart : {});
//    Products.findById(prodId, (err, product) => {
//      if (err) {
//        return res.redirect("back");
//      }
//      cart.add(product, prodId);
//      req.session.cart = cart;
//      if (req.user) {
//        req.user.cart = cart;
//        req.user.save();
//      }
//      res.redirect("back");
//    });
//  };
 
//  exports.modifyCart = (req, res, next) => {
//    var prodId = req.query.id;
//    var qty = req.query.qty;
//    if (qty == 0) {
//      return res.redirect("back");
//    }
//    var cart = new Cart(req.session.cart ? req.session.cart : {});
//    Products.findById(prodId, (err, product) => {
//      if (err) {
//        return res.redirect("back");
//      }
//      cart.changeQty(product, prodId, qty);
//      req.session.cart = cart;
//      if (req.user) {
//        req.user.cart = cart;
//        req.user.save();
//      }
//      res.redirect("back");
//    });
//  };
 
//  exports.getDeleteCart = (req, res, next) => {
//    req.session.cart = null;
//    if (req.user) {
//      req.user.cart = {};
//      req.user.save();
//    }
//    res.redirect("back");
//  };
 
//  exports.getDeleteItem = (req, res, next) => {
//    var prodId = req.params.productId;
//    var cart = new Cart(req.session.cart ? req.session.cart : {});
//    Products.findById(prodId, (err, product) => {
//      if (err) {
//        return res.redirect("back");
//      }
//      cart.deleteItem(prodId);
//      req.session.cart = cart;
//      if (req.user) {
//        req.user.cart = cart;
//        req.user.save();
//      }
//      console.log(req.session.cart);
//      res.redirect("back");
//    });
//  };
 
//  exports.addOrder = (req, res, next) => {
//    var cartProduct;
//    if (!req.session.cart) {
//      cartProduct = null;
//    } else {
//      var cart = new Cart(req.session.cart);
//      cartProduct = cart.generateArray();
//    }
//    res.render("add-address", {
//      title: "Thông tin giao hàng",
//      user: req.user,
//      cartProduct: cartProduct
//    });
//  };
 
//  exports.postAddOrder = async (req, res, next) => {
//    console.log(req.session.cart);
//    if (req.session.cart.totalQty) {
//      var order = new Order({
//        user: req.user,
//        cart: req.session.cart,
//        address: req.body.address,
//        phoneNumber: req.body.phone
//      });
 
//      for (var id in req.session.cart.items) {
//        await Products.findOne({ _id: id })
//          .then(product => {
//            product.buyCounts += parseInt(req.session.cart.items[id].qty);
//            product.save();
//          })
//          .catch(err => console.log(err));
//      }
 
//      order.save((err, result) => {
//        req.flash("success", "Thanh toán thành công!");
//        req.session.cart = null;
//        req.user.cart = {};
//        req.user.save();
//        res.redirect("/account");
//      });
//    } else {
//      req.flash("error", "Giỏ hàng rỗng!");
//      res.redirect("/account");
//    }
//  };
 
//  exports.mergeCart = (req, res, next) => {
//    if (req.user.cart != {} && req.user.cart) {
//      var cart = new Cart(req.session.cart ? req.session.cart : {});
//      cart = cart.addCart(req.user.cart);
//      req.session.cart = cart;
//      req.user.cart = cart;
//      req.user.save();
//    }
//    res.redirect("/");
//  };
 