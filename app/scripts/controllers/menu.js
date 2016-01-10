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
      // console.log('address: ', userAddress);
      if('address' in userAddress){
        if(userAddress.address !== null){
          $scope.userAddress = userAddress.address;
          return userAddress.address;
        }
      }
    }

    $scope.searchForRestaurants = function(){
      var address = checkForAddress();
      // alert('*need to get provider_menu_urls + provider');
      RestaurantService.singleRestaurantmatch();
      //get company object
        //in retrieveMenu call, should put provider_menu_urls inside so dont have to make api call to get company.
      
      //singleRestaurantmatch - make api call to get one restaurant from classic or postmates
    }

    

  });
