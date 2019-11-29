var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    decription: String,
    create_time : {
        type : Date, default: Date.now},
    update_time : {
        type : Date, default: Date.now},

})
var Category = mongoose.model('Category',categorySchema,'categorys');

module.exports = Category;