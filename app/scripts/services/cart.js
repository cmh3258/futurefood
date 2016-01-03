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
    var cartTotal = 0;

    function checkType(price){
      if(typeof price === 'number' || typeof price === 'float'){
        return price;
      }
      else{
        price = parseFloat(price);
        return price
      }
    }

    function roundPrice(price){
      return Math.round( price * 1e2 ) / 1e2;
    }

    function add(price,total){
      return roundPrice(checkType(total) + checkType(price));
    }

    function subtract(price,total){
      return roundPrice(checkType(total) - checkType(price));
    }

    function multiply(price, total){
      return roundPrice(checkType(total) * checkType(price));
    }

    function calcCartTotal(){
      cartTotal = 0;
      for(var i = 0; i < cart.length; i++){
        cartTotal = add(cartTotal,cart[i].totalPrice);
      }
    }

    // Public API here
    return {
      addEntryToCart: function(entry, newCartItem){
        //copy the item - angular tracks objects by hashkeys
        entry = angular.copy(entry);
        
        //get price of entry
        var entry_price = checkType(entry.totalPrice);

        //get price of options (in selected - look for price or loop through keys)
        var optionsSelected = [];
        for(var i = 0; i < entry.custom_options.length; i++){
          var selected = entry.custom_options[i].selected;
          
          if(selected !== undefined && 'price' in selected){
            optionsSelected.push(selected.name);
            var p = checkType(selected.price);
          }
          else{

            for(var n in selected){
              optionsSelected.push(n);
            }
          }
        }

        entry.optionsSelected = optionsSelected;
        //check minimum + calculate tax + remaining amount needed for minimum -> before pushing
        // delete entry['$$hashKey'];

        //either push new item, or exchange the items
        if(!newCartItem){
          var existingCartItemIndex = _.findIndex(cart, function(chr) {
            return chr.name == entry.name;
          });
          if(existingCartItemIndex > -1){
            cart.splice(existingCartItemIndex,1);
          }
        }
        cart.push(entry);
        calcCartTotal();
      },
      checkPriceType: function(price){
        return checkType(price);
      },
      getCart: function(){
        return cart;
      },
      getCartTotal: function(){
        return cartTotal;
      },
      optionRadialPricePreview: function(entry, selected){
        return add(selected.price,multiply(entry.price,entry.qty));        
      },
      optionCheckboxPricePreview: function(entry, option){
        var price = 0;
        for(var key in option.selected){
          if(typeof option.selected[key] !== 'boolean' && option.selected[key] !== false){
            price = add(price,option.selected[key]);
          }
          else{
            delete option.selected[key];
          }
        }
        return add(price,multiply(entry.price,entry.qty));
      },
      optionQty: function(entry,multiplyBy){
        var entryPrice = entry.price;
        var newEntryWithQty = multiply(entryPrice,multiplyBy);
        return add(entry.totalPrice,newEntryWithQty);
      }
    };
  });
