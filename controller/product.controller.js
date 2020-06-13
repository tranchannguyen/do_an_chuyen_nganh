var Product = require('../models/product.model');
var Category = require('../models/category.model');
// var shortid = require('shortid');
module.exports.index = async function(req,res){
	await this.updateSaleProduct();
	var products = await Product.find();
	
	res.render('products/index',{ products: products
	 });	
}
module.exports.deleteProduct = async function(req,res){

	await Product.deleteMany({_id: req.params.id},function(err){
	if(err) res.json(err);
	else	res.redirect('/products');
});
}
// module.exports.search = async function(req,res){
// 	var q = req.query.q;
// 	var matcheUser = await User.find();
// 	var users = matcheUser.filter(function(user){
// 		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
// 	});
//     res.render('users/index',{ users: users });
// }
module.exports.edit = async function(req,res){
	var id = req.params.id;
	var products = await Product.find({_id: id});
	var category = await Category.find();
	res.render('products/edit',
		{ products: products, category: category });
}
module.exports.postEdit = async function(req,res){
	if(req.body.quantity > 0)
	{
		req.body.status = true;
	}else req.body.status = false;
	req.body.popular = Boolean(req.body.popular);
	if(req.body.sales !== 0){
		var isSales = {
			status: true,
			percent: req.body.sales,
			end: req.body.endsale}
		}else {
			isSales = {
				status: false,
				percent: req.body.sales,
				end: null
		}
	}
	console.log(req.body.endsale)
	await Product.findOneAndUpdate({_id:req.params.id},{
		name:req.body.name,
		price:req.body.price,
		quantity:req.body.quantity,
		idCate: req.body.idCate,
		isSale: isSales,
		description:req.body.description,
		popular:req.body.popular,
		status:req.body.status,
		update_time : new Date()
	},function(err){
		if(err)	res.json(err);
		else	res.redirect('/products/'+req.params.id);
	})
}

module.exports.create = async function(req,res){
	var cates = await Category.find();
	res.render('products/create',{cates: cates});
}

module.exports.get = async function(req,res){
	var id = req.params.id;
	var products = await Product.findOne({_id: id});
	var cates = await Category.findOne({_id : products.idCate});
	res.render('products/detailProduct',
		{ products: products, cates: cates },
		);
}

module.exports.postCreate = async function(req,res){
	let arr = [];
	for(let i = 0; i< req.files.length;i++){
		await arr.push(req.files[i].path.split('\\').slice(1).join('/'))
	}
	req.body.pro_images = arr
	req.body.status = true
	req.body.name = req.body.name.trim()
	req.body.brand = req.body.brand.trim()
	await Product.insertMany(req.body);
	res.redirect('/products');
}
updateSaleProduct = async function(req,res){
	let product = await Product.find();
	product.reduce(function(acc,prod){
		if(prod.isSale.percent === 0 ){
			var isSales = {
				status: false,}
				Product.findOneAndUpdate({_id: prod._id},{
					isSale: isSales
				})
			}
				
		}
	)
}