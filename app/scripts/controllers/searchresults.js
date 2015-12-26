'use strict';

/**
 * @ngdoc function
 * @name harvestWebApp.controller:SearchresultsCtrl
 * @description
 * # SearchresultsCtrl
 * Controller of the harvestWebApp
 */
angular.module('harvestWebApp')
  .controller('SearchresultsCtrl', function ($scope, ScraperService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    ScraperService.getRestaurants().then(function(response){
      console.log('getRestaurants: ', response);
      $scope.restaurants = response.restaurants;
    })


  });
