var Users = require('../models/user.model');


module.exports.postCreate = async function(req,res,next){

	let user = await Users.find({email:req.body.email});

	var errors = [];
	if(req.body.name.length<=6){
		errors.push('Name is short, lessest 6 character')
	}
	if(req.body.phone.length<10||req.body.phone.length>10){
		errors.push('Phone is not Invalid')
	}
	if(!req.body.avatar==""){
		errors.push('Avatar is require')
	}
	if(!req.body.password||req.body.password.length<6){
		errors.push('Password is null or short')
	}
	if(!req.body.email||user.length >=1){
		errors.push('Email is require or tồn tại')
	}
	if(errors.length){
		res.render('users/create',{
			errors: errors,
			values: req.body
		});

		return;
	}
	next();
}