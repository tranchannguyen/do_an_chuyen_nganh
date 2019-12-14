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