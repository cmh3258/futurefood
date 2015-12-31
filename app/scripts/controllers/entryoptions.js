'use strict';

/**
 * @ngdoc function
 * @name harvestWebApp.controller:EntryoptionsCtrl
 * @description
 * # EntryoptionsCtrl
 * Controller of the harvestWebApp
 */
angular.module('harvestWebApp')
  .controller('EntryoptionsCtrl', function ($scope, entry, $modalInstance, CartService) {
    console.log('[EntryoptionsCtrl] entry: ', entry);

    // console.log(typeof entry.custom_options);

    entry.selectedOptions = [];
    entry.qty = 1;
    entry.totalPrice = CartService.checkPriceType(entry.price);

    if(typeof entry.custom_options !== 'object'){
      if(entry.custom_options.length !== 0){
        var options = JSON.parse(entry.custom_options);
        options = options[Object.keys(options)[0]];
        entry.custom_options = options;
      }
    }
    $scope.entry = entry;

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.addToCart = function(entry){
      console.log('[addToCart] entry: ', entry);
      CartService.addEntryToCart(entry);
    };

    $scope.$watch(function(){
      return $scope.entry;
    },
    function(newEntry){
      console.log('newEntry: ', newEntry);
    })

    //calculate the total amount with entry option pricing
    $scope.selected = function(option){
      $scope.entry.totalPrice = CartService.optionPricePreview($scope.entry,option);
    };

    $scope.qty = function(amount){
      $scope.entry.qty += amount;
      if($scope.entry.qty > 0){
        $scope.entry.totalPrice = CartService.optionQty($scope.entry,amount);
      }
      else{
        $scope.entry.qty = 1;
      }
    };

  });
