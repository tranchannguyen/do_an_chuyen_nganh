var User = require('../models/user.model')
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

module.exports.requireAuth = async function(req,res,next){
	console.log(req.signedCookies.userEmail);
	console.log('dadadasds');
	if(!req.signedCookies.userEmail)
	{
		res.redirect('/auth/login');
		return;
	}
	var user = await User.find({email: req.signedCookies.userEmail});
	console.log(user[0]);
	console.log('aasaa')
	if (!user[0]) {
		// statement
		res.redirect('/auth/login');
		return;	
	}
	res.locals.user = user[0];
	next();
}