require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path')
// var Product = require('./models/product.model')
// var Category = require('./models/category.model')
var app = express();
var port = 3000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true}).then(
   () => {
      console.log("connet DB success");
      
   },
   err => {
      console.log("connet fails .Error :${err}");
   }
   );

var productRoute  = require('./routes/product.route')
var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var productRoute = require('./routes/product.route')
var authMidleware = require('./midlewares/auth.midleware.js')
var adminMidleware = require('./midlewares/admin.midleware')
var userGMidleware = require('./midlewares/userG.midleware')
var categoryRoute = require('./routes/category.route')
var webpageRoute = require('./routes/webpage.route')


app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRECT));
mongoose.set('useFindAndModify', false);

app.use('/users/edits', express.static(path.join(__dirname, 'public')))
app.use('/users', express.static(path.join(__dirname, 'public')))
app.use('/products', express.static(path.join(__dirname, 'public')))
app.use('/products/edits', express.static(path.join(__dirname, 'public')))
app.use('/categorys', express.static(path.join(__dirname, 'public')))
app.use('/productofcategorys', express.static(path.join(__dirname, 'public')))
app.use('/viewDetailProduct', express.static(path.join(__dirname, 'public')))


// app.get('/', async function(req,res){
//    var products = await Product.find();
//    var categorys = await Category.find();
//    res.render('index',{
//       products: products,
//       categorys: categorys
//    });
// });

app.use('/',userGMidleware.requireUserG,webpageRoute);
app.use('/categorys',authMidleware.requireAuth,categoryRoute);
app.use('/users',authMidleware.requireAuth,adminMidleware.requireAdmin,userRoute);
app.use('/products',authMidleware.requireAuth,productRoute);
app.use('/auth',authRoute);
app.listen(port,function(){
	console.log('Server listening on port 3000');
});