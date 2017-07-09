var User = require('../models/user');  //user model in user collection of student database

exports.create = function(req, res) {
  console.log('new user data');
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.save(function(err, result){
    if (err){
      console.log('save new user error at user_api.server.controller.js', err);
    }else{
      res.json(result);
    }
  })
  //then connnect mongodb in server.js
};
//username:req.params.username

exports.lists = function(req, res) {
  if (req.params.username){
    User.find({username:req.params.username},function(err, result){
      if (err){
        console.log('get new user error at user_api.server.controller.js', err);
      }else{
        res.json(result);
      }
    })
  }else{
    console.log("w/o username");
    User.find({},function(err, results){
      if (err){
        console.log('get new user error at user_api.server.controller.js', err);
      }else{
        res.json(results);
      }
    })
    // then connnect mongodb in server.js
  }
};


exports.loginUser = function(req, res){
  // console.log(req.params.username, req.params.password);
  console.log(req.params.password);
  User.find({
    'username':req.params.username,
    'password':req.params.password
  },function(err, result){
    if (err){
      console.log('get new user error at user_api.server.controller.js', err);
    }else{
      console.log('server login user result',result);
      res.json(result);
    }
  })
};

exports.updateUser = function(req, res){
  var ObjectId = require('mongodb').ObjectID;

  console.log("params",new ObjectId(req.params.id));
  User.update(
    {'_id' : new ObjectId(req.params.id)},
    {$set: {
      'username' : req.body.username,
      'password' : req.body.password,
      'firstname' : req.body.firstname,
      'lastname' : req.body.lastname,
      'email' : req.body.email,
      'phone' : req.body.phone,
      'location' : req.body.location}},
      function(err, result){
        console.log("editing upjdateing ", result);
        res.json(result);
      }
    )
}
