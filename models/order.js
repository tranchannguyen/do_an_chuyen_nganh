var mongoose = require('mongoose');

var oderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    address: String,
    checked: Boolean,
    cart: {type: Object, required: true},
    create_time : {
        type : Date, default: Date.now},
    update_time : {
        type : Date, default: Date.now},

})
var Order = mongoose.model('Order',oderSchema,'order');

module.exports = Order;