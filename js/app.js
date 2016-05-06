angular.module('myApp', ['ngMessages', 'ngRoute', 'ngAnimate'])
  .run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/error');
    });
  })
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
      templateUrl : 'views/home.html'
    }).when('/home', {
      templateUrl : 'views/home.html'
    })
    .when('/meals', {
      templateUrl : 'views/meals.html',
      controller : 'mealCtrl'
    }).when('/earnings', {
      templateUrl : 'views/earnings.html',
      controller : 'earningCtrl'
    }).when('/error', {
      template : '<p>Error - Page Not Found</p>'
    })
    .otherwise('/');
  }])
  .controller('mainCtrl', function($rootScope, $scope){
    $rootScope.values = {};
    //Sets the values that get updated dynamically
    //Used when page first loads and on button reset
    $rootScope.setValues = function(){
      $rootScope.values.price = '';
      $rootScope.values.taxRate = '';
      $rootScope.values.tips = '';
      $rootScope.values.formValid = false;
    };

    //Sets the values that get updated dynamically
    //Used when page first loads and on button reset
    $rootScope.setInfoValues = function(){
      $rootScope.values.subTotal = 0.00;
      $rootScope.values.tip = 0.00;
      $rootScope.values.total = 0.00;
      $rootScope.values.tipTotal = 0.00;
      $rootScope.values.mealCount = 0;
      $rootScope.values.avgTip = 0.00;
      $rootScope.values.allMeals = [];
    };
    $rootScope.setValues();
    $rootScope.setInfoValues();
  })
  .controller('mealCtrl', function($rootScope, $scope){
    //Form submission logic. Checks to see if form is valid
    //If form is valid calculate charges
    $scope.submit = function(){
      if(!$scope.mealForm.$error.required && !$scope.mealForm.$error.min 
          && !$scope.mealForm.$error.number){
        $rootScope.values.formValid = true;
      }
      if($rootScope.values.formValid){
        $rootScope.values.subTotal = $rootScope.values.price + (($rootScope.values.price * $rootScope.values.taxRate) / 100);
        $rootScope.values.tip = ($rootScope.values.price * $rootScope.values.tips) / 100;
        $rootScope.values.total = $rootScope.values.subTotal + $rootScope.values.tip;
        $rootScope.values.tipTotal = $rootScope.values.tipTotal + $rootScope.values.tip;
        $rootScope.values.mealCount++;
        $rootScope.values.avgTip = $rootScope.values.tipTotal / $rootScope.values.mealCount;
        
        $rootScope.pristine();
        $rootScope.setValues();
      }
    };

    //Clears the form of any user input
    $scope.cancel = function(){
      $rootScope.pristine();
      $rootScope.setValues();
    };

    //Sets the form to pristine state
    $rootScope.pristine = function(){
      $scope.mealForm.$setPristine();
    };
  })
  .controller('earningCtrl', function($rootScope, $scope){
    //Resets all data and input fields
    //and puts page back to initial state
    $scope.reset = function(){
      $rootScope.setValues();
      $rootScope.setInfoValues(); 
    };
  });