var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    avatar: String,
    email: String,
    phone:String

})
var User = mongoose.model('User',userSchema,'users');

module.exports = User;