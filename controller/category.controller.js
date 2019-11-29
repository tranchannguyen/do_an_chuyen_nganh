const Category = require('../models/category.model');

module.exports.index = async function(req,res){
    var cates = await Category.find();
    res.render('category/index',
    {cates : cates});
}
module.exports.create = function(req,res){
    res.render('category/create')
}
module.exports.postCreate = async function(req,res){
    await Category.insertMany(req.body);
    res.redirect('/categorys');
}

module.exports.edits = async function(req,res){
    var id = req.params.id;
	var categorys = await Category.find({_id: id});
	res.render('category/edit',
		{ categorys: categorys });
}
module.exports.postEdits = async function(req,res){
    await Category.findByIdAndUpdate({_id:req.params.id},{
		name:req.body.name,
		decription:req.body.decription,
		update_time : new Date()
	},function(err){
		if(err)	res.json(err);
		else	res.redirect('/categorys');
	})
}
module.exports.deleteCategory = async function(req,res){
	await Category.deleteMany({_id: req.params.id},function(err){
	if(err) res.json(err);
	else	res.redirect('/categorys');
});
}
