app
.service('AppService', ['$http','$q', function($http,$q){
  var methods = {};

  methods.submit = function(data) {
    var d = $q.defer();

    $http.post('/save/result',data).then(function(res) {
      d.resolve(res);
    }).catch(function(e) {
      d.reject(e);
    })

    return d.promise;
  }



  return methods;
  
}])

