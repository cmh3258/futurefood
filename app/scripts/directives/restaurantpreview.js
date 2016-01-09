'use strict';

/**
 * @ngdoc directive
 * @name harvestWebApp.directive:restaurantpreview
 * @description
 * # restaurantpreview
 */
angular.module('harvestWebApp')
  .directive('restaurantpreview', function () {
    return {
      templateUrl: 'views/restaurantpreview.html',
      restrict: 'E',
      scope:{
        restaurant:'='
      },
      controller:function($scope, $location, RestaurantService){
        
        $scope.goToMenu = function(restaurant){
          console.log('[goToMenu] restaurant: ', restaurant);
          RestaurantService.setRestaurant(restaurant);
          var restaurantName = RestaurantService.getRestaurantUrlName();
          $location.path('/'+restaurantName+'/menu');
        };

      }
    };
  });
