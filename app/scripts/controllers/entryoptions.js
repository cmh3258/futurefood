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

  });
