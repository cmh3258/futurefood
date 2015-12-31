'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.cart
 * @description
 * # cart
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('CartService', function () {
    // Service logic
    // ...

    var cart = [];
    var cartPrice = 0;

    function checkType(price){
      if(typeof price === 'number' || typeof price === 'float'){
        return price;
      }
      else{
        price = parseFloat(price);
        return Math.round( price * 1e2 ) / 1e2;
      }
    }

    function add(price,total){
      return checkType(checkType(total) + checkType(price));
    }

    function subtract(price,total){
      return checkType(checkType(total) - checkType(price));
    }

    function multiply(price, total){
      return checkType(checkType(total) * checkType(price));
    }

    // Public API here
    return {
      addEntryToCart: function(entry){
        //get price of entry
        var entry_price = checkType(entry.price);

        //get price of options (in selected - look for price or loop through keys)
        var optionsSelected = [];
        var optionsPrice = 0;
        for(var i = 0; i < entry.custom_options.length; i++){
          var selected = entry.custom_options[i].selected;
          if('price' in selected){
            optionsSelected.push(selected.name);
            var p = checkType(selected.price);
            optionsPrice += p;
          }
          else{
            for(var n in selected){
              console.log('N: ', n, selected[n]);
              optionsSelected.push(selected[n]);
              optionsPrice += checkType(selected[n]);
            }
          }
        }

        entry.optionsSelected = optionsSelected;
        entry.totalPrice = optionsPrice + entry_price;
        cart.push(entry);
      },
      checkPriceType: function(price){
        return checkType(price);
      },
      optionPricePreview: function(entry, option){
        var optionAlreadyAdded = _.findWhere(entry.selectedOptions, {name: option.name});
        if(optionAlreadyAdded){
          return subtract(optionAlreadyAdded.price,entry.totalPrice);
        }
        else{
          return add(option.price,entry.totalPrice);
        }
      },
      optionQty: function(entry,multiplyBy){
        var entryPrice = entry.price;
        var newEntryWithQty = multiply(entryPrice,multiplyBy);
        return add(entry.totalPrice,newEntryWithQty);
      }
    };
  });
