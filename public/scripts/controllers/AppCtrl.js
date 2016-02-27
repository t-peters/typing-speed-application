app
    .controller('AppCtrl', ['$scope', 'AppService', "$window", '$timeout', function($scope, AppService, $window, $timeout) {

        $scope.name = "Name";
        $scope.counter = 60;
        var min = 0.0166667;
        $scope.grossWpm = 0;
        $scope.accuracy = 0;
        $scope.errorsLeft = 0;

        $scope.disabled = false;
        $scope.showResult = false;

        $scope.remark = "Unknown";
        $scope.correction = 0;
        var correctionMade = false;
        $scope.netWpm = 0;
        $scope.input = "";

        var keysPressed = $scope.keysCount = 0;
        var keyIndex = 0;
        var correctletters = 0;

        $scope.text = "It grew stronger as it moved northwest. It then made landfall on the western end of Cuba. The storm made a loop over open water, and then began moving towards the United States.";


        $scope.onTimeout = function() {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
        }
        var mytimeout = $timeout($scope.onTimeout, 1000);

        $scope.stop = function() {
            $scope.disabled = true;
            $timeout.cancel(mytimeout);
            $scope.save();
        }

        $scope.$watch("counter", function(newVal, oldval) {
            if (newVal === 0) {
                $scope.stop();
                $scope.showResult = true;
                $scope.disabled = true;
                calcAccuracy();
                calcWPM();
            }
        })

        $scope.reset = function() {
            $scope.keysCount = 0;
            $scope.errorsLeft = 0;
            correctionMade = false;
            $scope.correction = 0;
            $scope.counter = 60;
            $scope.disabled = false;
            $scope.showResult = false;
            $scope.onTimeout();
            $scope.input = "";
            keysPressed = 0;
            correctletters = 0;
            paragraphLength = $scope.text.length;

        }

        $scope.$watch("input.length", function(n, o){
          if(n < o) {

            $scope.correction++;
          } 

        })

        
        var paragraphLength = $scope.text.length;

        $scope.checkIfEnterKeyWasPressed = function($event) {
            $scope.keysCount = keysPressed = $scope.input.length;
            keyIndex = $scope.input.length;
            paragraphLength--;

            if($scope.input.length == 0) {
              $scope.keysCount = keysCount = 0;
            }
            if (keysPressed == $scope.text.length) {
                $scope.keysCount = 0;
                $scope.errorsLeft = 0;
                $scope.disabled = true;
                $scope.showResult = true;
                correctletters = 0;
                correctionMade = false;
                $scope.correction = 0;
                calcAccuracy();
                $scope.stop();
                calcWPM();
            }

            var keyCode = $event.which || $event.keyCode;
            if ($window.String.fromCharCode(keyCode) === $scope.text[keyIndex]) {
                correctletters++;
            } else {
            }

        };

        var calcAccuracy = function() {
            var result = $scope.accuracy = Math.floor((correctletters / $scope.text.length) * 100);
        }

        var calcWPM = function() {
          var grossResult = Math.floor((keysPressed/5)/1);
          $scope.grossWpm = grossResult;

          if(grossResult < 35) {
            $scope.remark = "Novice";
          } else if(grossResult >= 35 && grossResult <= 40) {
            $scope.remark = "Average";
          } else {
            $scope.remark = "Professional";
          }
          
        }

        $scope.save = function() {
            var user = $window.sessionStorage.getItem('auth');
            var data = {user: user,result: $scope.grossWpm};
            AppService.submit(data).then(function(res) {
                console.log(res.data);
            })
        }


    }])
