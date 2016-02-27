app
.controller('LogoutCtrl', ['$scope','$state','$window','$rootScope', function($scope,$state,$window,$rootScope){
  $scope.logout = function() {
      $window.sessionStorage.clear();
      $rootScope.loginStatus = false;
      $state.go("login");
    }

    $scope.logout();
  
}])