'use strict';

/**
 * @ngdoc directive
 * @name harvestWebApp.directive:cart
 * @description
 * # cart
 */
angular.module('harvestWebApp')
  .directive('cart', function (CartService) {
    return {
      templateUrl: 'views/cart.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // element.text('this is the cart directive');


      },
      controller:function($scope, CartService){
        console.log('cart directive.');

        $scope.cart = CartService.getCart();


      }
    };
  });
