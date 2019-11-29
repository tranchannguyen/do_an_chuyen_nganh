var User = require('../models/user.model');
module.exports.requireAdmin = async function(req,res,next){
    var userlogin = await User.find({email: req.signedCookies.userEmail})
	var authAdmin = userlogin[0];
	if(!authAdmin.admin == true){
		 return res.redirect('/products')
	 }
	next();
}