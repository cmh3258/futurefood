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
      // console.log('cart: ', cart);
      cartTotal = 0;
      for(var i = 0; i < cart.length; i++){
        // console.log('cart[i].totalPrice: ', cart[i].totalPrice);
        // console.log('cartTotal1: ', cartTotal);
        cartTotal = add(cartTotal,cart[i].totalPrice);
      }
      // console.log('cartTotal2: ', cartTotal);
    }

    // Public API here
    return {
      addEntryToCart: function(entry){
        //get price of entry
        var entry_price = checkType(entry.totalPrice);

        //get price of options (in selected - look for price or loop through keys)
        var optionsSelected = [];
        // var optionsPrice = 0;
        for(var i = 0; i < entry.custom_options.length; i++){
          var selected = entry.custom_options[i].selected;
          delete entry.custom_options[i]['$$hashKey'];
          
          if(selected !== undefined && 'price' in selected){
            optionsSelected.push(selected.name);
            var p = checkType(selected.price);
            // optionsPrice += p;
          }
          else{

            for(var n in selected){
              console.log('N: ', n, selected[n]);
              optionsSelected.push(n);
              // optionsPrice += checkType(selected[n]);
            }
          }

          //delete the hashkeys so can add same item multiple times
          for(var j = 0; j < entry.custom_options[i].options.length; j++){
            delete entry.custom_options[i].options[j]['$$hashKey'];
          }
        }

        entry.optionsSelected = optionsSelected;
        // entry.totalPrice = optionsPrice + entry_price;

        //check minimum + calculate tax + remaining amount needed for minimum -> before pushing
        delete entry['$$hashKey'];
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
        // var optionAlreadyAdded = _.findWhere(entry.selectedOptions, {name: option.name});
        // var newEntryWithQty = multiply(entryPrice,multiplyBy);
        return add(selected.price,multiply(entry.price,entry.qty));
        /*if(optionAlreadyAdded){
          return subtract(optionAlreadyAdded.price,entry.totalPrice);
        }
        else{
          return add(option.price,entry.totalPrice);
        }*/
      },
      optionCheckboxPricePreview: function(entry, option){
        console.log('option.selected: ', option.selected);
        var price = 0;
        for(var key in option.selected){
          console.log("key: ", key, option.selected[key]);
          console.log(typeof option.selected[key]);
          if(typeof option.selected[key] !== 'boolean' && option.selected[key] !== false){
            price = add(price,option.selected[key]);
          }
          else{
            console.log('made it.');
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
