'use strict';

/**
 * @ngdoc directive
 * @name harvestWebApp.directive:entry
 * @description
 * # entry
 */
angular.module('harvestWebApp')
  .directive('entry', function () {
    return {
      templateUrl: 'views/entry.html',
      restrict: 'E',
      scope:{
        entry:'='
      },
      link: function postLink(scope, element, attrs) {
        // element.text('this is the entry directive');
      },
      controller:function($scope, $modal){
        $scope.animationsEnabled = true;

        $scope.openOptions = function (entry) {

          var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/entryoptions.html',
            controller: 'EntryoptionsCtrl',
            // size: size,
            resolve: {
              entry: function () {
                return entry;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            // $log.info('Modal dismissed at: ' + new Date());
            console.log('modal dismissed');
          });
        };
      }
    };
  });
