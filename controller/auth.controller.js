var User = require('../models/user.model')
var md5 = require('md5')


module.exports.login = 	function(req,res){
	if(req.signedCookies.userEmail)
	{
		res.redirect('/users');
		return;
	}
	res.render('auth/login');	
}
module.exports.logout = function(req,res){
	res.clearCookie('userEmail')
	res.render('auth/login');	
}

module.exports.postlogin = async function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	
	var users = await User.findOne({email: email});
	if(!users){
		res.render('auth/login',{
			errors : ['User does not exit.']
		});
		return;
	}
	var haspassword = md5(password);
	if (users.password !== haspassword) {
		// statement
		res.render('auth/login',{
			errors : ['Password not true.']
		});
		return;
	}
	res.cookie('userEmail',users.email,{signed:true});
	res.redirect('/products');
}