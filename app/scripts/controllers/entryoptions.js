'use strict';

/**
 * @ngdoc function
 * @name harvestWebApp.controller:EntryoptionsCtrl
 * @description
 * # EntryoptionsCtrl
 * Controller of the harvestWebApp
 */
angular.module('harvestWebApp')
  .controller('EntryoptionsCtrl', function ($scope, entry, newCartItem, $modalInstance, CartService) {
    console.log('[EntryoptionsCtrl] entry: ', entry);

    // console.log(typeof entry.custom_options);

    initial();

    function initial(){
      $scope.entry = entry;
      if(newCartItem){
        $scope.entry.selectedOptions = [];
        $scope.entry.qty = 1;
        $scope.entry.totalPrice = CartService.checkPriceType(entry.price);

        if(typeof $scope.entry.custom_options !== 'object'){
          if($scope.entry.custom_options.length !== 0){
            var options = JSON.parse($scope.entry.custom_options);
            options = options[Object.keys(options)[0]];
            $scope.entry.custom_options = options;
          }
        }
      }
      
      // $scope.entry = entry;
    }

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.addToCart = function(){
      CartService.addEntryToCart($scope.entry, newCartItem);
      $modalInstance.close();
    };

    //calculate the total amount with entry option pricing
    $scope.selected = function(selected,option){
      console.log('selected option: ', option);
      if(option.selection_type !== 'checkbox'){
        for (var i = 0; i < option.options.length; i++){
          if(option.options[i].name !== selected.name){
            option.options[i].selected = false;
          }
        }
        option.selected = selected;
        $scope.entry.totalPrice = CartService.optionRadialPricePreview($scope.entry,selected);
      }
      else{
        $scope.entry.totalPrice = CartService.optionCheckboxPricePreview($scope.entry,option);
      }
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
