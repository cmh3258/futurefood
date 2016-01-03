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

    //call scrapers and postmates
    ScraperService.getRestaurants();

    /*$scope.$watch(function(){
      return ScraperService.getFormattedRestaurants();
    },
    function(newValue){
      var retrievedProviders = ScraperService.getScrapeProviders();
      console.log('retrievedProviders: ', retrievedProviders);
      $scope.retrievedProviders = retrievedProviders;
      $scope.restaurants = newValue;
    });*/

    $scope.restaurants = ScraperService.getFormattedRestaurants();

    $scope.retrievedProviders = ScraperService.getScrapeProviders();;



  });
