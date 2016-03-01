app
.service('RegistrationService', ['$http','$q', function($http,$q){
  var reg_methods = {};

  reg_methods.new_user = function(data) {
    var def = $q.defer();

    $http.post('/registration',data).then(function(res) {
      def.resolve(res);
    }).catch(function(e) {
      def.reject(e);
    })

    return def.promise;
  }

  return reg_methods;

  
}])