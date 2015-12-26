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
      }
    };
  });
