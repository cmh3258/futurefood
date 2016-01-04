'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.RestaurantService
 * @description
 * # RestaurantService
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('RestaurantService', function (ProviderService) {
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
        ProviderService.setCurrentProvider = restaurant.providers[0];
      },
      getRestaurant: function(){
        return restaurant;
      }
    };
  });
