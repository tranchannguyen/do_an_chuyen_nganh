var mongoose = require('mongoose');

var userGSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    pass: String,
    email: String,
    phone:String,
    status:String,
    address: String,
    create_time : {
        type : Date, default: Date.now},
    update_time : {
        type : Date, default: Date.now},

})
var UserG = mongoose.model('UserG',userGSchema,'userG');

module.exports = UserG;