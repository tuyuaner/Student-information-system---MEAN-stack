var studentApp = angular.module('studentApp', ['ui.router','ngDragDrop','ui.bootstrap', 'ngResource']); //empty array is for modules that the current module depends on

//----------------------------ng-router----------------------------------
// studentApp.config(function ($routeProvider){
//     $routeProvider
//       .when('/signin',
//         {
//           controller:'signinController',
//           templateUrl:'/views/sign_in.html'
//         }
//       )
//       .when('/signup',
//         {
//           controller:'signupController',
//           templateUrl:"/views/sign_up.html"
//         }
//     )
//     .otherwise({
//       controller:'signinController',
//       templateUrl:'/views/sign_in.html'
//     });
// });
//
//----------------------------ui-router----------------------------------
studentApp.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise("/signin");
    $stateProvider
      .state('signin',
        {
          url:"/signin",
          views:{
            "topnav_before":{
              controller:'signinController',
              templateUrl:'views/nav_beforeLogin.html'
            },
            "content":{
              controller:'signinController',
              templateUrl:'views/sign_in.html'
            }
          }
        })
      .state('signup',
        {
          url:"/signup",
          views:{
            "topnav_before":{
              controller:'signupController',
              templateUrl:'/views/nav_beforeLogin.html'
            },
            "content":{
              controller:'signupController',
              templateUrl:"/views/sign_up.html"
            }
          }

        })
      .state('home',
        {
          url:"/home/:username",
          //url:"/home/:username",
          views:{
            "topnav_after":{
              controller:'homeController',
              templateUrl:'/views/nav_afterLogin.html'
            },
            "content":{
              controller:'homeController',
              templateUrl:"/views/home.html"
            }
          },
        })
      .state('profile',
        {
          url:"/profile/:username",
          views:{
            "topnav_after":{
              controller:'homeController',
              templateUrl:'/views/nav_afterLogin.html'
            },
            "content":{
              controller:'profileController',
              templateUrl:"/views/profile.html"
            }
          },
        })
      .state('messages',
        {
          url:"/messages/:username",
          views:{
            "topnav_after":{
              controller:'homeController',
              templateUrl:'/views/nav_afterLogin.html'
            },
            "content":{
              controller:'messagesController',
              templateUrl:"/views/messages.html"
            }
          },
        })


        .state('messagesDetails',
          {
            ///
            url:"/messagesDetails/:username/:messageId",
            views:{
              "topnav_after":{
                controller:'homeController',
                templateUrl:'/views/nav_afterLogin.html'
              },
              "content":{
                controller:'messagesDetailsController',
                templateUrl:"/views/messagesDetails.html"
              }
            }

          })
        .state('loginWarning',
          {
            url:"/loginWarning",
            views:{
              "content":{
                controller:'signinController',
                templateUrl:'/views/sign_in.html'
              },
              "topnav_after":{
                controller:'loginWarningController',
                templateUrl:"/views/loginWarning.html"
              }
            }

          })

}]);
