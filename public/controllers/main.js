
// signin
// rootScope.isCurrentUser should be done in factory
angular.module('studentApp')
.controller('signinController', function($scope, $rootScope, $location, $state, userServices,messageServices){
  userServices.checkForUserLogin("home");
  $scope.userInfo = {
    username: "",
    password: ""
  };

  function loginUser(){
    var User =  userServices.loginUser($scope.userInfo.username, $scope.userInfo.password);
    return User.get({username:$scope.userInfo.username, password:$scope.userInfo.password}).$promise.then(function(result){
      console.log(result);
      if (result && result.length == 1){
        console.log('we have only one user login result, go to user home page',result[0].username);
        sessionStorage.setItem('currentUser', JSON.stringify(result[0]));

        return $state.go("home",{
                username: result[0].username
              })
      }else{
        // no such a user
        console.log("user login error");
        $location.path('loginWarning');
      }
      return result;
    });
  };
  $scope.signin = function(){
    loginUser()
  };
  $scope.forgetPassword = function(){
    console.log("forget Password");
  }
})



// signup
.controller('signupController',function($scope,$rootScope, $element, $resource,userServices){
  $scope.userInfo = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location: "",
  };
  $scope.locations = ['New Jersey', 'New York', 'California', 'Illinois', 'Texas'];
  $scope.reset = function(){
    for (key in $scope.userInfo){
      $scope.userInfo[key] = "";
    };
  };
  $scope.myDropCallBack = function(event, ui){
    var obj = ui.draggable.scope();

    console.log('Dropped into something',obj.l);
    if ($scope.userInfo.location){
      $scope.userInfo.location += obj.l + "; ";
    }else{
      $scope.userInfo.location = obj.l + "; ";
    }

    $("li[name*='"+ obj.l+ "']" ).remove();

};



  $scope.registerUser = function(){
    //validation
    for (key in $scope.userInfo){
      if ($scope.userInfo[key].$valid == false){
        console.log("failed to sign up");
        return;
      };
    }
    userServices.saveUser($scope.userInfo);
  };
  
})



// home
.controller('homeController', function($scope, $rootScope, $location, userServices){
  $scope.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  userServices.checkForUserLogin("home","loginWarning");
  $scope.logout = function(){
    console.log("logout");
    $rootScope.isCurrentUser = false;
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("messages");
    $location.path("signin");
  }
})


// profile
.controller('profileController', function($scope, $rootScope, $location, $state, userServices){
  userServices.checkForUserLogin("profile","loginWarning");
  $scope.userInfo = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location: ""
  };
  $scope.editing = false;

  var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (currentUser){
    $scope.userInfo._id = currentUser._id;
    $scope.userInfo.firstname = currentUser.firstname;
    $scope.userInfo.lastname = currentUser.lastname;
    $scope.userInfo.password = currentUser.password;
    $scope.userInfo.name = currentUser.firstname + " " +currentUser.lastname;
    $scope.userInfo.username = currentUser.username;
    $scope.userInfo.email = currentUser.email;
    $scope.userInfo.phone = currentUser.phone;
    $scope.userInfo.location = currentUser.location
    $scope.back =function(){
      $state.go("home",{
        username: currentUser.username
      })
    };
    $scope.edit = function(){
      $scope.editing = !$scope.editing;
      console.log($scope.userInfo);
    };

    $scope.save = function(){

      userServices.saveEditUser($scope.userInfo);

    }

  };

})
// messages
.controller('messagesController', function($scope, $location, $state, $rootScope, userServices,messageServices){
  messageServices.getMessages(JSON.parse(sessionStorage.getItem("currentUser")).username).then(function(result){
    sessionStorage.setItem('messages',  JSON.stringify(result.data));
    $scope.messages = JSON.parse(sessionStorage.getItem("messages"));
  });

  userServices.checkForUserLogin('messages',"loginWarning");

  console.log("messagesController controller");
  $scope.allMessage = JSON.parse(sessionStorage.getItem("messages"));
  var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  $scope.importantClicked = function(meg){
    console.log("meg",meg);
    if (meg.important == 0){
      meg.important = 1;
      $(this).addClass('star-checked');
      messageServices.updateImportance(meg._id,meg.important);
    }else{
      meg.important = 0;
      $(this).removeClass('star-checked');
      messageServices.updateImportance(meg._id,meg.important);
    }
    $scope.allMessage.forEach(function(item){
      if (item._id == meg._id){
        item.important = meg.important;
        console.log(item);
      }
    });
    sessionStorage.setItem("messages", JSON.stringify($scope.allMessage));
  }

  $scope.goToDetails = function(event){
    console.log("details",event._id);

    $state.go("messagesDetails", {
      username: currentUser.username,
      messageId: event._id
    });
  }


  $scope.delete = function(){
    console.log("delete");
    angular.forEach($scope.messages, function(meg){
      if(meg.selected){
        messageServices.deleteMessage(meg._id);
        messageServices.getMessages(JSON.parse(sessionStorage.getItem("currentUser")).username).then(function(result){
          sessionStorage.setItem('messages',  JSON.stringify(result.data));
          $scope.messages = JSON.parse(sessionStorage.getItem("messages"));
        });
      }
    })
  }
})
// messagesDetails
.controller('messagesDetailsController', function($scope, $state,userServices,messageServices){
  console.log('details messages');
  userServices.checkForUserLogin('messagesDetails', 'loginWarning');
  $scope.allMessage = JSON.parse(sessionStorage.getItem("messages"));

  function filtered(obj){
    return obj._id == $state.params.messageId
  }
  $scope.message = $scope.allMessage.filter(filtered)[0];

  if ($scope.message.important == 1){

    $(".important_star").addClass('star-checked');
  }else{
    $(".important_star").removeClass('star-checked');

  };


  $scope.replyCheck = false;
  $scope.replyMessageArray = [];
  $scope.replyMessage = {
    recipient:$scope.message.sender,
    recipient_img:$scope.message.sender_img,
    sender:$scope.message.recipient,
    sender_img:$scope.message.recipient_img,
    title:"reply: "+$scope.message.title,
    description:"",
    important:"0",
    created_at: new Date().toUTCString()
  };

  $scope.reply = function(){

    if ($scope.replyCheck == true){
        // http call save message:
      messageServices.saveMessage($scope.replyMessage);

      $scope.allMessage.push($scope.replyMessage);
      sessionStorage.setItem("messages", JSON.stringify($scope.allMessage));
      $scope.replyMessageArray.push($scope.replyMessage);
    }
    $scope.replyCheck = !$scope.replyCheck;
  };

  $scope.importantClicked = function(){
    if ($scope.message.important == 0){
      $scope.message.important = 1;
      $(".important_star").addClass('star-checked');
      messageServices.updateImportance($scope.message._id,$scope.message.important);
    }else{
      $scope.message.important = 0;
      $(".important_star").removeClass('star-checked');
      messageServices.updateImportance($scope.message._id,$scope.message.important);
    };
    $scope.allMessage.forEach(function(item){
      if (item._id == $scope.message._id){
        item.important = $scope.message.important;
        // console.log(item);
      }
    });
    sessionStorage.setItem("messages", JSON.stringify($scope.allMessage));
  }

  $scope.back =function(){
    var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    $state.go("messages",{
        username: currentUser.username
    })
  };

  $scope.delete = function(){
    messageServices.deleteMessage($scope.message._id);
    $scope.back();
  }


})


// loginWarning
.controller('loginWarningController', function($scope, $location){

})
