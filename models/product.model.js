var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type:String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: false
      },
    idCate : String,
    price: {
        type: Number,
        required: true
    },
    quantity: Number,
    brand: String,
    pro_images: {
        type: [String]
      },
    status: Boolean,
    dateAdded: {
        type: Date,
        required: false,
        default: Date.now
      },
    update_time : {
        type : Date, default: Date.now},
    buyCounts: {
      type: Number,
      required: false,
      default: 0
    },
    rating: {
      byUser: String,
      content: String,
      star: Number
    },
    isSale: {
      status: {
        type: Boolean,
        default: false
      },
      percent: {
        type: Number,
        default: 0
      },
      end: {
        type: Date
      }
    },
    comment: {
        total: {
          type: Number,
          require: false,
          default: 0
        },
        items: [
          {
            title: {
              type: String
            },
            content: {
              type: String
            },
            name: {
              type: String
            },
            date: {
              type: Date,
              default: Date.now
            },
            star: {
              type: Number
            }
          }
        ]
    }
})
// const index = {
//     name: "text",
//     description: "text",
//     brand: "text",
//     "productType.nameCate": "text",
//   };
//   productSchema.index(index);
var Product = mongoose.model('Product',productSchema,'products');

module.exports = Product;