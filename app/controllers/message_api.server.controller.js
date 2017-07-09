var Message = require('../models/message');

exports.lists = function(req,res){
  Message.find({recipient:req.params.recipient}, function(err, result){
    if (err) throw err;
    if (!result){
      res.send({success: false, info: "Can't find any message"})
    }else{
      res.json(result);
    }
  });
};

exports.updateImp = function(req,res){
  var ObjectId = require('mongodb').ObjectID;
  Message.update(
    {'_id' : new ObjectId(req.params.id)},
    {$set: {
      'important': req.params.importance}},
      function(err, result){
        console.log("editing upjdateing ", result);
        res.json(result);
      }
    )
}



exports.delete = function(req,res){
  var ObjectId = require('mongodb').ObjectID;
  Message.remove(
    {'_id' : new ObjectId(req.params.id)},
    function(err, result){
      console.log('deleted', result);
    }
    )
}




exports.saveMessage = function(req, res){
  var message = new Message();
  message.recipient =  req.body.recipient,
  message.recipient_img =  req.body.recipient_img,
  message.sender =  req.body.sender,
  message.sender_img =  req.body.sender_img,
  message.title =  req.body.title,
  message.description =  req.body.description,
  message.created_at =  req.body.created_at,
  message.important =  req.body.important

  message.save(function(err, result){
    console.log(result);
  })
}
