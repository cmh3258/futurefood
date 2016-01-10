'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.address
 * @description
 * # address
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('AddressService', function ($q) {
    // Service logic
    // ...

    var meaningOfLife = 42;
    var lat = null;
    var lng = null;
    var zipcode = null;
    var formatted_address = null;

    function getZip(place){
      var zipcode = '';
      if ('address_components' in place){
        for(var i = 0; i < place.address_components.length; i++){
          var types = place.address_components[i].types;
          for(var j = 0; j < types.length; j++){
            if(types[j] === 'postal_code'){
              zipcode = place.address_components[i].long_name;
              if(zipcode === ''){
                zipcode = place.address_components[i].short_name;
              }
              return zipcode;
            }
          }
          if(zipcode !== ''){
            return zipcode;
          }
        }
      }

      return null;
    }

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      checkAddress: function(address) {
        var defer = $q.defer();
        if(address){
          formatted_address = 'formatted_address' in address ? address.formatted_address : null;
          lat = 'geometry' in address ? address.geometry.location.lat() : null;
          lng = 'geometry' in address ? address.geometry.location.lng() : null;
          // console.log(formatted_address, ' : ', lat , ': ',lng);
          zipcode = getZip(address);
          // console.log('zipcode: ', zipcode);
        }

        if(formatted_address === null){
          defer.reject('Formatted address not found.');
        }
        if(lat === null || lng === null){
          defer.reject('Address has bad lat and lng.');
        }
        if(zipcode === null){
          defer.reject('Address has bad zipcode.');
        }

        defer.resolve('Success');

        return defer.promise;
      },
      getAddressAttrs: function(){
        return {'address':formatted_address, 'lat':lat, 'long': lng, 'zipcode': zipcode};
      }
    };
  });
