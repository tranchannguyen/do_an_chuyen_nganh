require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true}).then(
   () => {
      console.log("connet DB success");
      
   },
   err => {
      console.log("connet fails .Error :${err}");
   }
   );


var userRoute = require('./routes/user.route')
var adminRoute = require('./routes/admin.route')
var authRoute = require('./routes/auth.route')
// var prodRoute = require('./routes/product.route')
var authMidleware = require('./midlewares/auth.midleware.js')
var app = express();
var port = 3000;

app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRECT));

app. get('/',function(req,res){
   res.render('index');
});

app.use('/admin',adminRoute);
// app.use('/product',authMidleware.requireAuth,prodRoute);
app.use('/admin/users',userRoute);
app.use('/auth',authRoute);
app.listen(3000,function(){
	console.log('Server listening on port 3000');
});