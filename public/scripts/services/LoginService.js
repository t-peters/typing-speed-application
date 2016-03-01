app
.service('LoginService', ['$http','$q', function($http,$q){
  var loginMethods = {};

  loginMethods.login = function(data) {
    var d = $q.defer();
    $http.post('/login',data).then(function(res) {
      d.resolve(res);

    }).catch(function(e) {
      d.reject(e);
    });

    return d.promise;
  }

  return loginMethods;
  
}])