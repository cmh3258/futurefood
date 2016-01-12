'use strict';

/**
 * @ngdoc function
 * @name harvestWebApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the harvestWebApp
 */
angular.module('harvestWebApp')
  .controller('MenuCtrl', function ($scope, menu, AddressService, RestaurantService) {
   
    console.log('[menu] ', menu);
    $scope.userAddress = false;

    checkForAddress();

    if(menu){
      $scope.menu = menu.data;
    }

    function checkForAddress(){
      var userAddress = AddressService.getAddressAttrs();
      if('address' in userAddress){
        if(userAddress.address !== null){
          $scope.userAddress = userAddress.address;
          return userAddress.address;
        }
      }
    }

    $scope.searchForRestaurants = function(){
      var address = checkForAddress();
      if(!RestaurantService.singleRestaurantmatch()){
        alert('This is not in your delivery zone. Sorry.');
      }
    }

    

  });
