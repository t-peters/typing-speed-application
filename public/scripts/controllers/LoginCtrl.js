app
.controller('LoginCtrl', ['$scope','LoginService','$state','$window','$rootScope', function($scope,LoginService,$state,$window,$rootScope){
  $scope.name = "Login"
  $rootScope.loginStatus = false;

  $scope.login = function (data) {
    LoginService.login(data).then(function(res) {
      if(res.data.code === "success") {
        $rootScope.loginStatus = true;
        $window.sessionStorage['auth'] = angular.toJson(res.data.user);
        $state.go('app');
      } else {
        console.log("failed");
      }
    });



  }
}])