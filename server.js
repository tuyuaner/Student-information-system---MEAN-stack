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

