app
.controller('RegisterCtrl', ['$scope','RegistrationService', function($scope,RegistrationService){
  $scope.name = "Registration"

  $scope.collectData = function(data) {
    // console.log(data);
    RegistrationService.new_user(data).then(function(res) {
      console.log(res);
    });
  }
}])