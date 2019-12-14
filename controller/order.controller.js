var Order  = require('../models/order')

module.exports.get = async function(req,res){
	
	var id = req.params.id;
    var orders = await Order.find({_id: id});
    console.log(orders)
    var arrayPro = Object.values(orders[0].cart.items);
 
	
	res.render('products/detailsOrder',
		{ arrayPro: arrayPro, orders: orders[0] },
		);

}
module.exports.deleteOrder = async function(req,res){

	await Order.remove({_id:req.params.id},function(err){
	if(err) res.json(err);
	else	res.redirect('/orders');
});
}
module.exports.edit =async function(req,res){
	await Order.findByIdAndUpdate({_id:req.params.id},{
		checked:Boolean(true),
	},function(err){
		if(err)	res.json(err);
		else	res.redirect('/orders');
	})
}