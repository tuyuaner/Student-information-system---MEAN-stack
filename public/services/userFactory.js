angular.module('studentApp')

.factory("userServices",function($resource,$state){
  var factory = {};


  // resolve: {
    // get All users
    // Users:  function(userServices){
    //   return userServices.getUsers();
    // }
  factory.getUsers = function(){
    var Users = $resource('api/newUser/');
    return Users.query(function(results){
      return results;
      })
    };
  factory.getAuser = function(name){
    var User = $resource('api/newUser/:username');
    return User.get({username:name}, function(result){
      return result;
    });
  };

  factory.loginUser = function(name,pass){
    var User = $resource('api/newUser/:username/:password',{}, {get: {method: 'get',params:{username:name, password:pass}, isArray: true}});
    return User;
  };
//

  factory.checkForUserLogin = function(state, elState=""){
    var user =JSON.parse(sessionStorage.getItem("currentUser"));
    if (user){
      $state.go(state,{
              username: user.username
            });
    }else if (elState != ""){
        $state.go(elState);
      }
  };

  factory.saveUser = function(userInfo){
    var User = $resource('api/newUser/');
    var newUser = new User ();

    newUser.username = userInfo.username;
    newUser.password = userInfo.password;
    newUser.firstname = userInfo.firstname;
    newUser.lastname = userInfo.lastname;
    newUser.email = userInfo.email;
    newUser.phone = userInfo.phone;
    newUser.location = userInfo.location;
    newUser.$save(function(result){
      console.log("saving", result);
      sessionStorage.setItem('currentUser', JSON.stringify(result));
      $state.go("home",{
          username: result.username
        });
    });
  }

  factory.saveEditUser = function(userInfo){

     var User = $resource('api/updateUser/:id',
                            { id: userInfo._id},
                            { 'update': { method:'PUT' }});

    var newUser = new User (userInfo);
    return User.update(newUser).$promise.then(function(result){
      if (result.nModified == 1){
        sessionStorage.setItem("currentUser",JSON.stringify(userInfo));
        $state.go("home",{
          username: userInfo.username
        });
      }
      return result;
    });
  }

  return factory;
})
