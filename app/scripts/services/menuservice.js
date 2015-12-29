'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.MenuService
 * @description
 * # MenuService
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('MenuService', function ($http) {
    // Service logic
    // ...

    var menu = {};

    // Public API here
    return {
      retrieveMenu: function(restaurantName){
        $http({
          method: 'POST',
          url:'http://squirtle-harvest.herokuapp.com/orders',
          data:{'restaurant_name':restaurantName}
        }).then(function(response){
          console.log('[retrieveMenu] Success response: ', response);
          menu = response;
          return menu;
        })
        .catch(function(response){
          console.log('[retrieveMenu] Error response: ', response);
          return response;
        })
      },
      getCurrentMenu: function(){
        return menu;
      },
      getMenuById: function(id){
        return $http({
          method: 'GET',
          url:'http://squirtle-harvest.herokuapp.com/menus/'+ id.toString() + '/'
        }).then(function(response){
          console.log('[retrieveMenu] Success response: ', response);
          menu = response;
          return menu;
        })
        .catch(function(response){
          console.log('[retrieveMenu] Error response: ', response);
          return response;
        })
      }
    };
  });
