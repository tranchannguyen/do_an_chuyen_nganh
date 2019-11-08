var User = require('../models/user.model')

module.exports.login = 	function(req,res){
	res.render('auth/login');	
}
module.exports.postlogin = async function(req,res,next){
	var email = req.body.email;
	var password = req.body.password;

	var users = await User.find({email: email});
	if(!users){
		res.render('auth/login',{
			errors : ['User does not exit.']
		});
		return;
	}
	if (users.password !== password) {
		// statement
		res.render('auth/login',{
			errors : ['Password not true.']
		});
		return;
	}
	res.cookie('userId',user._id,{signed:true});
	res.redirect('/admin');
}