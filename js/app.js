angular.module('myApp', ['ngMessages'])
  .controller('myCtrl', function($scope){
    $scope.subTotal = '0.00';
    $scope.tip = '0.00';
    $scope.total = '0.00';
    $scope.tipTotal = '0.00';
    $scope.mealCount = 0;
    $scope.avgTip = '0.00';

    var setValues = function(){
      $scope.price = '';
      $scope.taxRate = '';
      $scope.tips = '';
      $scope.formValid = false;  
    };

    setValues();

    $scope.submit = function(){
      if(!$scope.userForm.$error.required){
        $scope.formValid = true;
      }
      if($scope.formValid){

        setValues();
      }
    }
  });