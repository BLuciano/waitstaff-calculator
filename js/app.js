angular.module('myApp', ['ngMessages'])
  .controller('myCtrl', function($scope){
    $scope.subTotal = 0.00;
    $scope.tip = 0.00;
    $scope.total = 0.00;
    $scope.tipTotal = 0.00;
    $scope.mealCount = 0;
    $scope.avgTip = 0.00;
    $scope.allMeals = [];

    //Resets input values, used when site first loads and 
    //after each successful form submission
    var setValues = function(){
      $scope.price = '';
      $scope.taxRate = '';
      $scope.tips = '';
      $scope.formValid = false;  
    };

    setValues();

    //Form submission logic
    $scope.submit = function(){
      //Checks to see if form is valid
      if(!$scope.mealForm.$error.required){
        $scope.formValid = true;
      }
      //If form is valid calculate charges
      if($scope.formValid){
        $scope.subTotal = $scope.price + (($scope.price * $scope.taxRate) / 100);
        $scope.tip = ($scope.price * $scope.tips) / 100;
        $scope.total = $scope.subTotal + $scope.tip;
        $scope.tipTotal = $scope.tipTotal + $scope.tip;
        $scope.mealCount++;
        $scope.avgTip = $scope.tipTotal / $scope.mealCount;
        $scope.mealForm.$setPristine();
        setValues();
      }
    };
  });