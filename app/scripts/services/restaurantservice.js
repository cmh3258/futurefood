'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.RestaurantService
 * @description
 * # RestaurantService
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('RestaurantService', function () {
    // Service logic
    // ...

    var restaurant = null;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      setRestaurant: function(restaurant){
        this.restaurant = restaurant;
      },
      getRestaurant: function(){
        return restaurant;
      }
    };
  });
