angular.module('studentApp')

.factory("messageServices",function($http,$state){
  var messageFactory = {}

  messageFactory.getMessages = function(_recipient){

    return $http.get('/api/getMessages/'+_recipient);
  }

  messageFactory.updateImportance = function(_id, _important){
    return $http.put('/api/updateMessageImportance/'+_id+'/'+_important);
  }

  messageFactory.deleteMessage = function(_id){
    return $http.delete('/api/deleteMessage/'+_id);
  }

  messageFactory.saveMessage = function(_message){
    return $http.post('/api/saveMessage', _message);
  }
  return messageFactory;



});
