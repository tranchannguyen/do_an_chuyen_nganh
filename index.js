require('dotenv').config();
console.log(process.env.SESSION_SECRECT);
var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var prodRoute = require('./routes/product.route')
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

app.use('/product',authMidleware.requireAuth,prodRoute);
app.use('/users',authMidleware.requireAuth,userRoute);
app.use('/auth',authRoute);
app.listen(3000,function(){
	console.log('Server listening on port 3000');
});