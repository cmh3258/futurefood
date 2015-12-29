'use strict';

/**
 * @ngdoc function
 * @name harvestWebApp.controller:EntryoptionsCtrl
 * @description
 * # EntryoptionsCtrl
 * Controller of the harvestWebApp
 */
angular.module('harvestWebApp')
  .controller('EntryoptionsCtrl', function ($scope, entry, $modalInstance) {
    console.log('[EntryoptionsCtrl] entry: ', entry);

    var options = JSON.parse(entry.custom_options);
    options = Object.keys(options)[0];
    entry.custom_options = options;
    $scope.entry = entry;

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
