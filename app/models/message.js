var mongoose = require('mongoose');

module.exports = mongoose.model('messages', {
  recipient: String,
  recipient_img: String,
  sender: String,
  sender_img: String,
  title: String,
  description:String,
  created_at: Date,
  important: Number
})
