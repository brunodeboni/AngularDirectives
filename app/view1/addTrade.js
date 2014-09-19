'use strict';

angular.module('myApp.addTrade', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addTrade', {
    templateUrl: 'view1/addTrade.html',
    controller: 'addTradeCtrl'
  });
}])

.controller('addTradeCtrl', ['$scope', function($scope){
		$scope.master = new Trade();

		$scope.update = function(trade) {
			$scope.trade = angular.copy(trade);
		};

		$scope.reset = function() {
			$scope.trade = angular.copy($scope.master);
		};

		$scope.reset();
}]);