var User = require('../models/user.model')

module.exports.requireAuth = function(req,res,next){
	if(!req.signedCookies.userId)
	{
		res.redirect('/auth/login');
		return;
	}
	var users = User.findById(
		{_id: req.signedCookies.userId});
	if (!user) {
		// statement
		res.redirect('/auth/login');
		return;	
	}
	res.locals.user = user;
	next();
}