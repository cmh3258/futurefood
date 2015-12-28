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
      link: function postLink(scope, element, attrs) {
        // element.text('this is the restaurantpreview directive');
      },
      controller:function($scope, $location, RestaurantService){
        
        $scope.goToMenu = function(restaurant){
          console.log('[goToMenu] restaurant: ', restaurant);
          RestaurantService.setRestaurant(restaurant);
          var restaurantName = restaurant.restName.split(' ').join('-');
          $location.path('/'+restaurantName+'/menu');
        };

      }
    };
  });
