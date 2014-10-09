'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
	'ngRoute'

])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/addTrade.html',
			controller: 'addTradeCtrl'
		}).otherwise({redirectTo: '/addTrade'});
	}])

	.controller('addTradeCtrl', ['$scope', function ($scope) {
		$scope.master = new Money();
		$scope.money = new Money();

		$scope.update = function (trade) {
			$scope.money = angular.copy(trade);
		};

		$scope.reset = function () {
			$scope.money = angular.copy($scope.master);
		};

		$scope.reset();
	}]);