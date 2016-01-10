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
      },
      get_best_provider: function(previous_provider, current_provider){
        var provider_heirarchy = ['GrubHub','dineondemand','eat24','bitesquad','eatstreet','mrdelivery','eatoutin','postmates'];

        //get index of past provider chosen
        for(var past_index = 0; past_index < provider_heirarchy.length; past_index++){
          if(provider_heirarchy[past_index].toLowerCase() === previous_provider.providerName.toLowerCase()){
            break;
          }
        }

        //get index of current provider
        for(var current_index = 0; current_index < provider_heirarchy.length; current_index++){
          if(provider_heirarchy[current_index].toLowerCase() === current_provider.providerName.toLowerCase()){
            break;
          }
        }

        //if the provider is more important than the previous one
        if(past_index > current_index){
          return current_provider;
        }
        else{
          return previous_provider;
        }
      }
    };
  });
