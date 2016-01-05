'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.UserService
 * @description
 * # UserService
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('UserService', function ($http, $window) {

    var user = null;
    var loggedIn = false;
    var savedAddresses = null;
    var paymentMethods = null;
    var auth = null;

    function setAuth(user){
      var authString = ('Basic '+ btoa(user.email + ':' + user.password));
      $window.localStorage.setItem('auth', authString);
      $http.defaults.headers.common.Authorization = authString;
    }

    function clearAuth(){
      $window.localStorage.removeItem('auth');
      $http.defaults.headers.common.Authorization = '';
    }

    function setSavedAddresses(user){
      var addresses = user.saved_addresses;
      if(addresses.length > 0){
        if(typeof(addresses) === 'string'){
          try{
            $window.localStorage.setItem('savedAddresses', addresses);
            savedAddresses = JSON.parse(addresses);
            return savedAddresses;
          }
          catch(e){
            $window.localStorage.setItem('savedAddresses', JSON.stringify(addresses));
            savedAddresses = addresses;
            return savedAddresses;
          }
          else{
            return false;
          }
        }
        else{
          $window.localStorage.setItem('savedAddresses', JSON.stringify(addresses));
          return addresses;
        }
      }
      else{
        return false;
      }
    }

    // Public API here
    return {
      login: function(payload){
        return $http({
          method: 'POST',
          url:'http://squirtle-harvest.herokuapp.com/login/',
          data:payload
        }).then(function(response){
          console.log('[login] Success response: ', response);
          setAuth(payload);
          user = response;
          loggedIn = true;
          setSavedAddresses(response);
          return user;
        })
        .catch(function(response){
          console.log('[login] Error response: ', response);
          return {'response':response, 'state':'Error'};
        })
      },
      updateUser: function(user){
        //get saved addresses into a string
        var addresses = setSavedAddresses(user);
        if(addresses){
          user.saved_addresses = JSON.stringify(addresses);
        }
        else{
          user.saved_addresses = '';
        }
        //match user in db
        var url = 'http://squirtle-harvest.herokuapp.com/accounts/'+ user.username + '/';
        return $http({
          method: 'PATCH',
          url:url,
          data:user
        }).then(function(response){
          console.log('[updateUser] Success response: ', response);
          setAuth(response);
          user = response;
          setSavedAddresses(response);
          return {'response':response, 'state':'Error'};
        })
        .catch(function(response){
          console.log('[updateUser] Error response: ', response);
          return response;
        })
      },
      logout: function(){
        return $http({
          method: 'POST',
          url:'http://squirtle-harvest.herokuapp.com/logout/',
        }).then(function(response){
          console.log('[logout] Success response: ', response);
          clearAuth();
          user = null;
          loggedIn = false;
          return user;
        })
        .catch(function(response){
          console.log('[login] Error response: ', response);
          return {'response':response, 'state':'Error'};
        })
      },
      getSavedAddresses: function(){
        return savedAddresses;
      },
      isLoggedIn: function(){
        return loggedIn;
      }
    };
  });
