var User = require('../models/user.model');
module.exports.requireAdmin = async function(req,res){
    var userlogin = await User.find({email: req.signedCookies.userEmail})
	var authAdmin = userlogin[0];
	if(authAdmin.admin == true){
		var users = await User.find();
		res.render('users/index',{
		 users: users
	 });
	}else res.redirect('/products')
}