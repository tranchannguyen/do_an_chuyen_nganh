var Product = require('../models/product.model')
var Category = require('../models/category.model')

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