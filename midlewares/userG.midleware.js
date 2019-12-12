var UserG = require('../models/userG.model')

module.exports.requireUserG = async function(req,res,next){
	if(req.signedCookies.userG){
        var userG = await UserG.find({_id: req.signedCookies.userG});
        if (!userG[0]) {
            // statement
            return;	
        }else res.locals.userG = userG[0];
    }
	next();
}