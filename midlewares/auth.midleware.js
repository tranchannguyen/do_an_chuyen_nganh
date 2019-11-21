var User = require('../models/user.model')
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
module.exports.requireAuth = async function(req,res,next){
	console.log(req.signedCookies.userId)
	if(!req.signedCookies.userId)
	{
		res.redirect('/auth/login');
		return;
	}
	var users = await User.find(
		{_id: req.signedCookies.userId});
	console.log(users[0]);
	if (!users[0]) {
		// statement
		res.redirect('/auth/login');
		return;	
	}
	res.locals.users = users;
	next();
}