app
.service('AppService', ['$http','$q', function($http,$q){
  var appMethods = {};

  appMethods.submit = function(resultData) {
    var d = $q.defer();

    $http.post('/save/result',resultData).then(function(res) {
      d.resolve(res);
    }).catch(function(e) {
      d.reject(e);
    })

    return d.promise;
  }



  return appMethods;
  
}])

