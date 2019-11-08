var db = require('../db')
var shortid = require('shortid');

module.exports.index = 	function(req,res){
	res.render('admin/index');	
}