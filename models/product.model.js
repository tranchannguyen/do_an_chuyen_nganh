var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    decription: String,
    pro_image:String,
    status: Boolean,
    create_time : {
        type : Date, default: Date.now},
    update_time : {
        type : Date, default: Date.now},

})
var Product = mongoose.model('Product',productSchema,'products');

module.exports = Product;