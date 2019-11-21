
// var shortid = require('shortid');
module.exports.index = async function(req,res){
	res.render('products/index',{
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
module.exports.create = function(req,res){
	res.render('products/create');
}
// module.exports.get = function(req,res){
// 	var id = req.params.id;
// 	var users = User.find({_id: id});
// 	res.render('users/detailUser',
// 		{ users: users });
// }
// module.exports.postCreate = async function(req,res){
// 	req.body.password = md5(req.body.password);
// 	req.body.admin = Boolean(req.body.admin);
// 	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
// 	console.log(req.body);
// 	await User.insertMany(req.body);
// 	res.redirect('/users');
// }
