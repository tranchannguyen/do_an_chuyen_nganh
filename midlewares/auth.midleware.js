var User = require('../models/user.model')

module.exports.requireAuth = async function(req,res,next){
	if(!req.signedCookies.userEmail)
	{
		res.redirect('/auth/login');
		return;
	}
	var user = await User.find({email: req.signedCookies.userEmail});
	if (!user[0]) {
		// statement
		res.redirect('/auth/login');
		return;	
	}
	res.locals.user = user[0];
	next();
}