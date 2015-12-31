'use strict';

/**
 * @ngdoc directive
 * @name harvestWebApp.directive:addressbar
 * @description
 * # addressbar
 */
angular.module('harvestWebApp')
  .directive('addressbar', function (AddressService) {
    return {
      templateUrl: 'views/addressbar.html',
      restrict: 'E',
      link: function(scope, element, attrs) {

        // Create the autocomplete object, restricting the search to geographical location types.
        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete(
          (document.getElementById('autocomplete')),{ types: ['geocode'] }
        );
        
        // When the user selects an address from the dropdown, populate the address fields in the form.
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var address = autocomplete.getPlace();
          scope.$apply(function(){
            AddressService.checkAddress(address).then(function(response){
              console.log('[AddressService.checkAddress] Success: ', response);
              scope.address = response;
            },
            function(response){
              console.log('[AddressService.checkAddress] Error: ', response);
              scope.address = response;
            });
          });
        });

      }
    };
  });
