// var express = require('express');
// module.exports = function(){
//   var app = express();
//   require('../app/routes/index.server.routes.js')(app);
//   return app
// }

var express = require('express'),
    morgan = require('morgan'), //simple logger middleware
    compress = require('compression'), //response compression
    bodyParser = require('body-parser'), //several middleware to handle request data
    methodOverride = require('method-override'); //DELETE and PUT HTTP verbs legacy support

module.exports = function() {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(express.static('public'));

    // use resutful api to for users collection 
    require('../app/routes/user_api.server.routes.js')(app);
    // use resutful api to for messages collection
    require('../app/routes/message_api.server.routes.js')(app);

    // require('../app/routes/home.server.routes.js')(app);
    return app;
};

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