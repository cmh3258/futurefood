'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.RestaurantService
 * @description
 * # RestaurantService
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('RestaurantService', function ($http, ProviderService, AddressService) {
    // Service logic
    // ...

    var restaurant = null;
    var restaurantUrlName = null; //for app routes

    /*
     * Gets the best provider between two choices
     */
    function getBestProvider(previous_provider, current_provider){
      return ProviderService.get_best_provider(previous_provider, current_provider);
    };

    function setProvider(){
      console.log('restaurant: ', restaurant);
      var best_provider = '';
      var provider_menu_urls;
      try{
        provider_menu_urls = JSON.parse(restaurant.provider_menu_url);
      }
      catch(e){
        provider_menu_urls = restaurant.provider_menu_url;
      }
      for(var i = 0 ; i < provider_menu_urls.length; i++){
        var key = '';
        for(key in provider_menu_urls[i]){
        }
        if(best_provider === ''){
          return {'providerName':key,'info':provider_menu_urls[i][key]};
        }
        else{
          return getBestProvider(best_provider, {'providerName':key,'info':provider_menu_urls[i][key]});
        }
      }
    }

    //will have to set the provider fields after retrieving successful indexing
    function formatProviderInfo(isPostmates, data){
      /*//postmates
      if(isPostmates){
        var provider = restaurant.providers[0];
        var provider_menu_urls = JSON.parse(restaurant.provider_menu_url);

        provider.deliveryPriceFlat = 4.99;
        provider.deliveryPercent = 9;
        provider.deliveryTimeMin = 45;
        provider.deliveryTimeMax = 70;
        provider.minPurchase = 0;
        provider.restURL = provider_menu_urls[0].postmates;
        o.restaurant.providers = [provider];
      }
      else{
        //classic
        var provider = o.restaurant.providers[0];
        provider.deliveryPriceFlat = response.data.p_f;
        provider.deliveryPercent = response.data.p_p;
        provider.deliveryTimeMin = response.data.t_m;
        provider.deliveryTimeMax = response.data.t_x;
        provider.minPurchase = response.data.m_d;
        provider.restURL = response.data.r_u;
        o.restaurant.providers = [provider];
      }
      */
    }

    //index to postmates restaurant
    function singlePostmatesRestaurant(){
      var address = AddressService.getAddressAttrs();
      var company_id = restaurant.id;
      var data = {'address': address.address, 'company_id':company_id};
      return $http({
        method: 'POST',
        url:'http://squirtle-harvest.herokuapp.com/singlepcompatability/',
        data:data
      }).then(function(response){
        console.log('[singlePostmatesRestaurant] Success response: ', response);
        return response;
      })
      .catch(function(response){
        console.log('[singlePostmatesRestaurant] Error response: ', response);
        return response;
      })
    }

    //index to classic restaurant (not postmates or favor)
    function singleClassicRestaurant(bestProvider){
      var address = AddressService.getAddressAttrs();
      var company = restaurant;
      console.log('company: ', company);
      alert('not done');

      //will need to add primary_name to retrieveMenu call.


      //create data to send
      /*var data = {
        'address':address.address, 
        'zipcode':address.zipcode, 
        'lat':address.lat.toString(), 
        'long':address.lng.toString(),

        'provider':best_provider.providerName,
        'r_names':o.restaurant.primary_name
      };

      //create request
      var url1 = '//harvest-rest-match.herokuapp.com/get_provider';
      var request = { 
        method: 'POST', 
        url: url1,
        headers: {'Content-Type': 'application/json'},
        data: data
      };
      
      return $http(request).then(function(response){
        if(response.data.response === 'restaurant not found'){
          return 'Restaurant Not Found.';
        }*/
    }

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      setRestaurant: function(restaurant){
        this.restaurant = restaurant;
        restaurantUrlName = restaurant.restName.split(' ').join('-');
        ProviderService.setCurrentProvider = restaurant.providers[0];
      },
      getRestaurant: function(){
        return restaurant;
      },
      getRestaurantUrlName: function(){
        return restaurantUrlName;
      },
      /*
      ** makeRestaurantObject: Imitate the company object from our db
      ** params : restaurant -> response from MenuService.retrieveMenu call
      */
      makeRestaurantObject: function(rest){
        var newRestaurant = {
          'restName':rest.restaurant_name, 
          'name':rest.restaurant_name,
          'company':{
              'menu_id':rest.menu_id
          },
          'menu_id':rest.menu_id,
          'provider_menu_url': rest.provider_menu_url,
          'id':rest.company_id
        }
        // this.restaurant = restaurant;
        restaurant = newRestaurant;
        console.log('makeRestaurantObject: ', restaurant);
      },
      /*
      ** singleRestaurantmatch : Used to match a company to a delivery service (for indexing)
      ** params : None
      */
      singleRestaurantmatch: function(){
        var bestProvider = setProvider();
        restaurant.providers = [{'providerName':bestProvider.providerName}];
        if(bestProvider.providerName === 'postmates'){
          console.log('postmates provider.');
          singlePostmatesRestaurant();
        }
        else{
          console.log('classic provider.');
          singleClassicRestaurant(bestProvider);
        }
      }
    };
  });
