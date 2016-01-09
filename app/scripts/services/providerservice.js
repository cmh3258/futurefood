'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.ProviderService
 * @description
 * # ProviderService
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('ProviderService', function () {
    // Service logic
    // ...

    var currentProvider = null;
    var providerMinimum = 0;

    // Public API here
    return {
      setCurrentProvider: function(provider){
        currentProvider = provider;
        providerMinimum = provider.minPurchase;
      },
      getCurrentProvider: function(){
        return currentProvider;
      },
      getProviderMinimum: function(){
        return providerMinimum;
      },
      getDeliveryPriceFlat: function() {
        return currentProvider.deliveryPriceFlat;
      }
    };
  });
