app
.service('LoginService', ['$http','$q', function($http,$q){
  var login_methods = {};

  login_methods.login = function(data) {
    var d = $q.defer();
    $http.post('/login',data).then(function(res) {
      d.resolve(res);

    }).catch(function(e) {
      d.reject(e);
    });

    return d.promise;
  }

  return login_methods;
  
}])