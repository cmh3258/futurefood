'use strict';

/**
 * @ngdoc function
 * @name harvestWebApp.controller:ProvidersCtrl
 * @description
 * # ProvidersCtrl
 * Controller of the harvestWebApp
 */
angular.module('harvestWebApp')
  .controller('ProvidersCtrl', function ($scope, ProviderService) {
    
    console.log('[ProvidersCtrl] ProviderService: ', ProviderService.getCurrentProvider());

  });
