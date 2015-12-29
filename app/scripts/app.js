'use strict';

/**
 * @ngdoc overview
 * @name harvestWebApp
 * @description
 * # harvestWebApp
 *
 * Main module of the application.
 */
angular
  .module('harvestWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/searchresults', {
        templateUrl: 'views/searchresults.html',
        controller: 'SearchresultsCtrl'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'
      })
      .when('/:restaurantname/menu',{
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl',
        resolve:{
          menu : function($route, RestaurantService, MenuService){
            console.log('RestaurantService.restaurant: ', RestaurantService.restaurant);
            if(!_.isEmpty(RestaurantService.restaurant)){
              //load menu
              return MenuService.getMenuById(RestaurantService.restaurant.company.menu_id).then(function(response){
                console.log('response: ',response);
                //need to check for success
                return response;
              })
            }
            else{
              var restaurant = $route.current.params.restaurantname;
              var restaurantNameArray = restaurant.split('-').join(' ');
              return MenuService.retrieveMenu(restaurantNameArray).then(function(response){
                console.log('Success menu resolve response: ', response);
                return response;
              })
              .catch(function(response){
                console.log('ERROR menu resolve response: ', response);
              })
            }
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
