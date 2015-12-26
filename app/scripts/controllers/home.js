'use strict';

/**
 * @ngdoc function
 * @name harvestWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the harvestWebApp
 */
angular.module('harvestWebApp')
  .controller('HomeCtrl', function ($scope, $location) {
    $scope.address = null;

    $scope.searchForRestaurants = function(){
      if($scope.address === 'Success'){
        $location.path('/searchresults');
      }
    }
  });
