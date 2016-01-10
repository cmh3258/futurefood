'use strict';

/**
 * @ngdoc directive
 * @name harvestWebApp.directive:cart
 * @description
 * # cart
 */
angular.module('harvestWebApp')
  .directive('cart', function (CartService, RestaurantService) {
    return {
      templateUrl: 'views/cart.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // element.text('this is the cart directive');
      },
      controller:function($scope, CartService, $modal, ProviderService, $location){
        $scope.cart = CartService.getCart();
        $scope.cartTotal = CartService.getCartTotal();
        $scope.cartMinimum = ProviderService.getProviderMinimum();
        
        $scope.$watch(function(){
          return CartService.getCartTotal();
        },function(newValue){
          $scope.cartTotal = newValue;
        })

        $scope.openOptions = function (entry) {
          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/entryoptions.html',
            controller: 'EntryoptionsCtrl',
            // size: size,
            resolve: {
              entry: function () {
                return entry;
              },
              newCartItem: function(){
                return false;
              }
            }
          });

          /*modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            console.log('modal dismissed');
          });*/
        };

        $scope.selectProvider = function(){
          var restaurantName = RestaurantService.getRestaurantUrlName();
          $location.path('/'+restaurantName+'/menu/providers');
        }


      }
    };
  });
