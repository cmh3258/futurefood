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
    'ngTouch'
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
      .otherwise({
        redirectTo: '/'
      });
  });
