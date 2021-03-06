app
    .controller('AppCtrl', ['$scope', 'AppService', "$window", '$timeout', function($scope, AppService, $window, $timeout) {

        $scope.name = "Name";
        $scope.counter = 0;
        $scope.grossWpm = 0;
        $scope.accuracy = 0;
        $scope.uncorrectedError = 0;
        $scope.startTime = null;
        $scope.endTime = null;

        $scope.disabled = true;
        $scope.showResult = false;

        $scope.remark = "Unknown";
        $scope.correction = 0;
        var correctionMade = false;
        $scope.netWpm = 0;
        $scope.input = "";

        var keysPressed = $scope.keysCount = 0;
        var keyIndex = $scope.input.length;
        var correctletters = 0;
        $scope.correctedErrors = 0;


        $scope.text = "It grew stronger as it moved northwest. It then made landfall on the western end of Cuba. The storm made a loop over open water, and then began moving towards the United States.";


        $scope.onTimeout = function() {
            $scope.counter++;
            mytimeout = $timeout($scope.onTimeout, 1000);
        }
        var mytimeout = $timeout($scope.onTimeout, 1000);

        $scope.stop = function() {
            $scope.disabled = true;
            $timeout.cancel(mytimeout);
            $scope.save();
        }

        $timeout.cancel(mytimeout);

        $scope.$watch("keysCount", function(newVal, oldval) {
            if (newVal === $scope.text.length) {
                $scope.stop();
                $scope.showResult = true;
                $scope.disabled = true;
                calcAccuracy();
                calcWPM();
            }
        })

        $scope.reset = function() {
            $scope.startTime = new Date();
            $scope.keysCount = 0;
            $scope.errorsLeft = 0;
            correctionMade = false;
            $scope.correction = 0;
            $scope.counter = 0;
            $scope.disabled = false;
            $scope.showResult = false;
            $scope.onTimeout();
            $scope.input = "";
            keysPressed = 0;
            correctletters = 0;
            paragraphLength = $scope.text.length;
            keyIndex = $scope.input.length;
            $scope.uncorrectedError = 0;

        }

        var paragraphLength = $scope.text.length;

        var checkInputLength = function() {
            if ($scope.input.length === 0) {
                $scope.keysCount = keysPressed = 0;
            }
        }

        $scope.checkIfEnterKeyWasPressed = function($event) {

            
            var keyCode = $event.which || $event.keyCode;
            if(keyCode !== 8) {
                $scope.keysCount = keysPressed += 1;
            }
            

            
            if (keyIndex === -1) {
                keyIndex = 0;
            }


            if ($window.String.fromCharCode(keyCode) === $scope.text[keyIndex]) {

                correctletters++;

            } else {

                $scope.uncorrectedError++;

            }


            if ($event.keyCode !== 8) {
                keyIndex++;
            }


        };

        $scope.checkForBackspace = function($event) {
            if ($event.keyCode === 8) {

                $scope.correctedErrors++;
                $scope.uncorrectedError--;
                keyIndex--;
                $scope.checkIfEnterKeyWasPressed($event);
            }

            return false;
        }

        var calcAccuracy = function() {
            var result = $scope.accuracy = Math.floor((correctletters / $scope.text.length) * 100);
        }

        var calcWPM = function() {

            $scope.endTime = new Date();

            $scope.minuteDifference = (($scope.endTime - $scope.startTime)/60000);
            console.log('s: ',$scope.startTime.toLocaleTimeString(),"  \n e: ",$scope.endTime.toLocaleTimeString()," \n diff: ",$scope.minuteDifference);
            var grossResult = $scope.grossWpm = Math.floor(((keysPressed - $scope.correction) / 5) / $scope.minuteDifference);
            $scope.netWpm = Math.floor((((keysPressed - $scope.correctedErrors) / 5) - $scope.uncorrectedError) / $scope.minuteDifference);

            if (grossResult < 35) {
                $scope.remark = "Novice";
            } else if (grossResult >= 35 && grossResult <= 40) {
                $scope.remark = "Average";
            } else {
                $scope.remark = "Professional";
            }

        }

        $scope.save = function() {
            var result = {
                gross: Math.floor(((keysPressed - $scope.correction) / 5) / 1),
                net: Math.floor((((keysPressed - $scope.correctedErrors) / 5) - $scope.uncorrectedError) / 1),
                accuracy: Math.floor((correctletters / $scope.text.length) * 100)
            }
            var user = $window.sessionStorage.getItem('auth');
            var data = { user: user, result: result };
            console.log(data);
            AppService.submit(data).then(function(res) {
                console.log(res.data);
            })
        }


    }])
