'use strict';

/**
 * @ngdoc function
 * @name harvestWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the harvestWebApp
 */
angular.module('harvestWebApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
