var User = require('../models/user.model');
// var shortid = require('shortid');
var md5 = require('md5');
module.exports.index = async function(req,res){

	var users = await User.find();
	
	res.render('users/index',{
		 users: users
	 });	
}
module.exports.search = async function(req,res){
	var q = req.query.q;
	var matcheUser = await User.find();
	var users = matcheUser.filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
    res.render('users/index',{ users: users });
}
module.exports.create = function(req,res){
	res.render('users/create');
}
module.exports.get =async function(req,res){
	var id = req.params.id;
	var users = await User.find({_id: id});
	console.log(users);
	res.render('users/detailUser',
		{ users: users });
}
module.exports.edit =async function(req,res){
	var id = req.params.id;
	var users = await User.find({_id: id});
	console.log(users);
	res.render('users/edit',
		{ users: users });
}
module.exports.postCreate = async function(req,res){
	req.body.password = md5(req.body.password);
	req.body.admin = Boolean(req.body.admin);
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	console.log(req.body);
	await User.insertMany(req.body);
	res.redirect('/users');
}
module.exports.putEdit = async function(req,res){
	await User.findByIdAndUpdate({_id:req.params.id},{
		name:req.body.name,
		email:req.body.email,
		phone:req.body.phone,
		address:req.body.address,
		admin:Boolean(req.body.admin),
		update_time : new Date()
	},function(err){
		if(err)	res.json(err);
		else	res.redirect('/users/'+req.params.id);
	})
}
module.exports.deleteUser = async function(req,res){
	await User.remove({_id:req.params.id},function(err){
		if(err) res.json(err);
		else	res.redirect('/users');
	});

}