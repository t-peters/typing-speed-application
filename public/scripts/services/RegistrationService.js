app
.service('RegistrationService', ['$http','$q', function($http,$q){
  var methods = {};

  methods.new_user = function(data) {
    var def = $q.defer();

    $http.post('/registration',data).then(function(res) {
      def.resolve(res);
    }).catch(function(e) {
      def.reject(e);
    })

    return def.promise;
  }

  return methods;

  
}])