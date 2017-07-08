process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express')
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost:27017/student');
var db = mongoose.connection;
db.on('error', function() {
    console.log('database connection error');
});
app.listen(8000);
console.log('running at 8000');


// var express = require('express'); //require the Express module
// var app = express();  //create a new Express application object
//
// var nunjucks = require('nunjucks');
// nunjucks.configure('views',{
//   autoescape:true,
//   express: app,
//   tags:{
//     blockStart: '<%',
//     blockEnd: '%>',
//     variableStart: '<$',
//     variableEnd: '$>',
//     commentStart: '<#',
//     commentEnd: '#>'
//   }
// });
//
// app.engine('html', engine.nunjucks);
// app.set('view engine', 'html');
// app.set('views', __dirname + 'views');
//
// // ---------------------------------------------bodyParser---------
// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({'extended': false}));
// app.use(bodyParser.json());
//   // access static file
// app.use(express.static("assets"));
//
//
//
//
// app.use('/',function(req,res){  //respond to any HTTP request made to the root path
//   res.send("hello world"); //wrapper, send the response back,   compare to Content-Type header  and res.end()
// }).listen(3000);  //Express application to listen to the port 3000
//
// console.log('Server running at http://localhost:3000/');
//
// module.exports = app;
