'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.ScraperService
 * @description
 * # ScraperService
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('ScraperService', function ($http, AddressService, $q, $timeout, ProviderService) {
    // Service logic
    // ...

    var meaningOfLife = 42;
    var formattedRestaurants = [];
    var categories = [];
    // var scrapeResults = [];
    var retrievedProviders = [];

    /*
     * Gets the best provider between two choices
     */
    function get_best_provider(previous_provider, current_provider){
      return ProviderService.get_best_provider(previous_provider, current_provider);
    };


    /*
     *  Return image url if get a match of categories.
     *  asian, breakfast, burgers, mexican, pizza
     */
    function categoriesLogo(categories){
      categories = categories.split(',');
      for(var i = 0; i < categories.length; i++)
      {
        switch(categories[i].toLowerCase()){
          case 'asian':
            return 'img/cuisine_logos/asian.png';
          case 'chinese':
            return 'img/cuisine_logos/asian.png';
          case 'breakfast':
            return 'img/cuisine_logos/breakfast.png';
          case 'burgers':
            return 'img/cuisine_logos/burger.png';
          case 'mexican':
            return 'img/cuisine_logos/mexican.png';
          case 'pizza':
            return 'img/cuisine_logos/pizza.png';
          case 'coffee & tea':
            return 'img/cuisine_logos/coffee.png';
          case 'mediterranean':
            return 'img/cuisine_logos/indian.png';
          case 'indian':
            return 'img/cuisine_logos/indian.png';
          case 'middle eastern':
            return 'img/cuisine_logos/indian.png';
          case 'ice cream':
            return 'img/cuisine_logos/icecream.png';
          case 'desserts':
            return 'img/cuisine_logos/dessert.png';
          case 'seafood':
            return 'img/cuisine_logos/seafood.png';
          case 'vegetarian':
            return 'img/cuisine_logos/vegetarian.png';
          case 'vegetarian / vegan':
            return 'img/cuisine_logos/vegetarian.png';
          case 'barbeque':
            return 'img/cuisine_logos/bbq.png';
          default:
            continue; //shouldn't return yet
        }
      }
      return false;
    };


    /*
     *  Return the url needed for the logo. Calls categoriesLogo();
     */
    function getImgUrl(categories, restaurant){
      if(restaurant.logo_url === 'no logo' || restaurant.logo_url === 'no logo found'){
        var catLogo = categoriesLogo(categories);
        if (catLogo !== undefined) {
          return catLogo;
        } 
        return 'img/fork28.svg';
      }
      return restaurant.logo_url;
    };

  /*
   *  Put restaurant categories into a dict so the user can search by it
   */
  function transformCategories(cats){
    var tempCats = cats.split(',');
    var temp;
    for(var c in tempCats){
      temp = tempCats[c];
      temp = temp.replace(' ','');
      temp = temp.replace('&','');
      temp = temp.replace('/','');
      temp = temp.replace(' ','');

      var foundCat = _.findIndex(categories, {name: tempCats[c]})
      if(foundCat > -1){
        categories[foundCat].count += 1;
      }
      else{
        if(tempCats[c].length !== 0){
          categories.push({'count':1, 'name':tempCats[c]});
        }
      }
    }

    categories = _.sortBy(categories, function(obj){ return obj.count });
    categories.reverse();
  };


      /*
     *  Set the provider delivery information 
     */
    var setProviderInfo = function(deliveryProvider, restaurant){
      var provider = {};
      provider.providerName = deliveryProvider.providerName;
      provider.providerID = deliveryProvider.providerID;
      provider.deliveryPriceFlat = restaurant.p_f;
      provider.deliveryPercent = restaurant.p_p;
      try{
        provider.deliveryTimeMin = restaurant.t_m.trim();
      }
      catch(e){
        provider.deliveryTimeMin = restaurant.t_m;
      }
      
      provider.deliveryTimeMax = restaurant.t_x;
      provider.minPurchase = restaurant.m_d;
      provider.restURL = restaurant.r_u;

      //does the timeMax need to be displayed? 
      if(provider.deliveryTimeMin === provider.deliveryTimeMax){
        provider.displayMax = false;
      }
      else{
        provider.displayMax = true;
      }

      //need to check if has percent not 0 and if so display fee + percent %
      if(provider.deliveryPercent === 0){
        provider.displayPercent = false;
      }
      else{
        provider.displayPercent = true;
      }

      return provider;
    };

    function format(item){
      for(var j = 0; j < item.restaurants.length; j++)
      {
        var restaurant = item.restaurants[j];
        restaurant.meetsMinimum = true;
        restaurant.providers = [setProviderInfo(item, restaurant)];

        //is the restaurant in finalRestaurants
        var restaurantExists = _.findWhere(formattedRestaurants, {company: {url:restaurant.company.url}});
        var restaurantExistsIndex = _.findIndex(formattedRestaurants, {company: {url:restaurant.company.url}});
        if(restaurantExists){
          formattedRestaurants[restaurantExistsIndex].providers = [get_best_provider(restaurantExists.providers[0], restaurant.providers[0])];
        }
        else{
          restaurant.logoURL = getImgUrl(restaurant.company.categories,restaurant.company);
          restaurant.restName = restaurant.r_n.trim();

          //transform yelp ids
          if(restaurant.company.yelp_id !== '' || restaurant.company.yelp_id !== 'None' || restaurant.company.yelp_id !== null){
            try{
              restaurant.company.yelp_id_array = restaurant.company.yelp_id.split(',');
              var linkToYelpCompany = 'http://www.yelp.com/biz/' + restaurant.company.yelp_id_array[0];

              //company doesn't have a yelp star rating or id
              if(restaurant.company.yelp_id_array[1] === undefined || restaurant.company.yelp_id_array[0] === undefined){
                restaurant.company.yelp_id_array = [];
              }
              else{
                restaurant.company.yelp_id_array[1] = '../img/'+restaurant.company.yelp_id_array[1]+'.png';
                restaurant.company.yelp_id_array.push(linkToYelpCompany);
              }
            }
            catch(e){
            }
          }
          else{
            restaurant.company.yelp_id_array = [];
          }

          transformCategories(restaurant.company.categories);
          // SearchService.finalDataResultsDoneList.push(true);
          formattedRestaurants.push(restaurant);
          formattedRestaurants = _.sortBy(formattedRestaurants, function(o) { return restaurant.providers[0].deliveryPriceFlat; });
        }                
      }
      return formattedRestaurants;
    }


  


    function pollForScrapeResults(jobID) {
    // console.log('pollForScrapeResults ', jobID);

    var timeout = '';
    var poller = function() {

      // $http.get('http://127.0.0.1:5000/results/'+jobID).            
      $http.get('//harvest-rest-match.herokuapp.com/results/'+jobID).
        success(function(data, status) {
          if (status === 200)
          {
            if(data === 'Failed'){
              var randomString = Math.random().toString(36).substring(7);
              retrievedProviders.push(randomString);
              return;
            }
            else
            {
              try{
                var providerName = data.providerName;
                retrievedProviders.push(providerName);
                format(data);
              }
              catch(e){
                var randomString = Math.random().toString(36).substring(7);
                retrievedProviders.push(randomString);
              } 
              return;
            }
          }
          else{
            // console.log('Failed (else)');
          }
          timeout = $timeout(poller, 3200);

        })
        .error(function(response){
          console.log('HTTP results/ error ', response.data, response.status);
          o.theCount += 1;
          if(o.theCount === o.localeslength){
            o.resultsAreDone = true;
          }
        });
    };
    poller();

  };


    function getRestaurantsInArea(){
      var data = AddressService.getAddressAttrs();
      var postmates = $http({
            method: 'POST',
            url:'http://squirtle-harvest.herokuapp.com/pcompatability/',
            data:data
          })
      var scraper = $http({
            method: 'POST',
            url:'http://harvest-rest-match.herokuapp.com/testrq',
            data:data
          })

      postmates.then(function(response){
        console.log('postmates response: ', response);

        var results = response.data;
          if(results === 'Error'){}
          else{
            retrievedProviders.push('Postmates');

            // o.localeslength += 1;
            var company = {};
            for(var i = 0; i < results.restaurants.length; i++){
              company = {
                'url':results.restaurants[i].url,
                'categories':results.restaurants[i].categories,
                'yelp_id':results.restaurants[i].yelp_id,
                'logo_url':results.restaurants[i].logo_url,
                'menu_id':results.restaurants[i].menu_id
              };
              var provider = JSON.parse(results.restaurants[i].provider_menu_url);
              results.restaurants[i].company = company;
              results.restaurants[i].r_n = results.restaurants[i].name;
              results.restaurants[i].p_f = 5.99;
              results.restaurants[i].p_p = 9;
              results.restaurants[i].t_m = 45;
              results.restaurants[i].t_x = 70;
              results.restaurants[i].m_d = 0;
              results.restaurants[i].r_u = provider[0].postmates;
            }
            var formatted = format(results);
            return;
          }

      }, function errorCallback(response) {
          console.log('error response: ', response);
          return response;
        })


      scraper.then(function(response){
        var results = response.data;
        for(var i=0;i<results.length;i++){
          pollForScrapeResults(results[i]);
        }
      }, function errorCallback(response) {
        console.log('error response: ', response);
          return response;
        })
    }

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      getRestaurants:function() {
        return getRestaurantsInArea();
      },
      getFormattedRestaurants:function(){
        // console.log('formattedRestaurants: ', formattedRestaurants);
        return formattedRestaurants;
      },
      getScrapeProviders:function(){
        return retrievedProviders;
      }
    };


  });
