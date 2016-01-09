'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.DiscountService
 * @description
 * # DiscountService
 * Factory in the harvestWebApp.
 */
angular.module('harvestWebApp')
  .factory('DiscountService', function (ProviderService) {

    var discountAmount = 0;
    var promoCode = null;
    var remainingCredits = null;
    var discountResponse = null;

    /*
     *  When user is selecting different referral codes, we need to clear out the old one
     *
    var resetCartFromCredit = function(){
      console.log('resetCartFromCredit: ', OrderService.discountFromPromoCode);
      var referral = UserService.user.discountcode_details;

      //if user selects free delivery
      if(OrderService.discountFromPromoCode[1] === 'Referral Free Delivery'){
        var estimatedCost = OrderService.discountFromPromoCode[0] + parseFloat($scope.orderEstimate);
        $scope.orderEstimate = estimatedCost.toFixed(2);

        referral.free_delivery_count += 1;
        referral.discount_free_delivery = false;
        UserService.discountInfo = referral;

        OrderService.discountFromPromoCode = [0,'']
        $scope.discountFromPromoCode = [0,''];
      }
      
      //if user selects credit
      else if(OrderService.discountFromPromoCode[1] === 'Referral Credit'){
        var estimatedCost = OrderService.discountFromPromoCode[0] + parseFloat($scope.orderEstimate);
        $scope.orderEstimate = estimatedCost.toFixed(2);

        //update the discount when checkout.
        referral.remainingCredits += OrderService.discountFromPromoCode[0];
        OrderService.discountFromPromoCode = [0,'']
        $scope.discountFromPromoCode = [0,''];

        UserService.discountInfo = referral;
      }

      //doesn't have a previously selected discount code
      else{
      }
    }*/

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      checkCode: function(code, amount){
        var deliveryFee = ProviderService.getDeliveryPriceFlat();
        var payload = {
          'code':code,
          'amount':amount,
          'delivery_fee':delivery_fee
        }

        return $http({
          method: 'POST',
          url:'http://squirtle-harvest.herokuapp.com/codecheck/',
          data:payload
        }).then(function(response){
          console.log('[checkCode] Success response: ', response);
          // menu = response;
          discountResponse = response;
          return response;
        })
        .catch(function(response){
          console.log('[checkCode] Error response: ', response);
          var message = response.data.detail;
          if(message == undefined){
            message = response.data.message;
          }
          return {'label':message, 'discount_amount':'0','state':'Error'};
        })
      },





    /*
     *  User enters a promo code
     *
    $scope.enterPromoCode = function(promoCode){
      resetCartFromCredit();
      document.getElementById("discountNone").checked = true

      //re add the discount that was put in before from the text field
      var estimatedCost = parseFloat($scope.orderEstimate);
      estimatedCost += parseFloat($scope.discountFromPromoCode[0]);

      UserService.checkCode(promoCode, parseFloat($scope.orderEstimate)).then(function(response){
        // console.log('[enterPromoCode] response: ', response);
        if($scope.orderEstimate === 0){
          //do nothing
          // console.log('this1');
        }
        else if($scope.discountFromPromoCode[0] === response.discount_amount){
          //do nothing
          // console.log('this2');
          $scope.promoCodeType = response.label;

        }
        else{
          // console.log('this3');
          $scope.promoCodeType = response.label;
          $scope.discountFromPromoCode[0] = response.discount_amount;
          $scope.discountFromPromoCode[1] = promoCode;
          OrderService.discount_update_type = response.discount_update_type;
          OrderService.discountFromPromoCode = [response.discount_amount, promoCode];

          estimatedCost = estimatedCost - $scope.discountFromPromoCode[0];
          $scope.discountFromPromoCode[0] = response.discount_amount;
          OrderService.discountFromPromoCode[0] = $scope.discountFromPromoCode[0];

          $analytics.eventTrack('Received a discount code [checkout]', {  category: '[checkout]', label: 'Received a discount code [checkout]' });
          $scope.orderEstimate = estimatedCost.toFixed(2);
          console.log('$scope.orderEstimate 2: ', $scope.orderEstimate);
          OrderService.orderEstimate = $scope.orderEstimate;
        }
      })
      .catch(function(response){
        // console.log('Error, enterPromoCode: ', response);
      })
    };

        /*
     *  Appply users credit to discount
     *
    $scope.applyCredit = function(code){

      var referral = UserService.user.discountcode_details;
      resetCartFromCredit();

      console.log('referral: ', referral);

      //if the cart is 0
      if(parseFloat($scope.orderEstimate) === 0){
        $scope.promoCodeType = 'You can\'t have a negative cart amount';
      }

      else if(code === 'none'){
        //do nothing        
      }

      //when the user uses a free_delivery
      else if(code === 'free_delivery'){
        var discount_amount = UserService.selectedProvider.deliveryPriceFlat;
        $scope.promoCodeType = 'Free Delivery';
        $scope.discountFromPromoCode[0] = discount_amount;
        $scope.discountFromPromoCode[1] = 'Referral Free Delivery';
        OrderService.discount_update_type = 'remove_free_delivery'
        OrderService.discountFromPromoCode = [discount_amount,'Referral Free Delivery'];

        var estimatedCost = parseFloat($scope.orderEstimate);
        estimatedCost = estimatedCost - $scope.discountFromPromoCode[0];
        $analytics.eventTrack('Using referral free_delivery [checkout]', {  category: '[checkout]', label: 'Using referral free_delivery' });
        $scope.orderEstimate = estimatedCost.toFixed(2);
        OrderService.orderEstimate = $scope.orderEstimate;

        referral.free_delivery_count -= 1;
        referral.discount_free_delivery = true;
        UserService.discountInfo = referral;
      }
    
      else if(referral.remainingCredits === 0){ 
        $scope.promoCodeType = 'You have no more credit to use.';
      }
      else if(code === 'credit' || referral.referral_credits !== 0){

        //set credits to remaining if exists
        if(referral.remainingCredits){
          var credits = referral.remainingCredits; 
        }
        else{
          var credits = referral.referral_credits; 
        }

        $scope.promoCodeType = 'Referral Credit';
        $scope.discountFromPromoCode[0] = credits;
        $scope.discountFromPromoCode[1] = 'Referral Credit';
        OrderService.discount_update_type = credits;
        OrderService.discountFromPromoCode = [credits,'Referral Credit'];

        // if have more credit then the cart amount, then find the remainings
        var estimatedCost = parseFloat($scope.orderEstimate);
        var remainingCredits = 0;
        var creditOff = 0;

        //when there are more credits then cart price
        if(estimatedCost < credits){
          //the remaining credits are estimated cost - credits
          remainingCredits = credits - estimatedCost;
          OrderService.discount_update_type = estimatedCost;

          //estimated cost == orderEstimate (cart total-price user is charged)
          creditOff = estimatedCost;
          estimatedCost = 0;
        }
        else{
          estimatedCost = estimatedCost - credits;
          creditOff = credits;
        }

        $scope.discountFromPromoCode[0] = creditOff;
        OrderService.discountFromPromoCode[0] = creditOff;
        $analytics.eventTrack('Using referral credit [checkout]', {  category: '[checkout]', label: 'Using referral credit [checkout]' });
        $scope.orderEstimate = estimatedCost.toFixed(2);
        OrderService.orderEstimate = $scope.orderEstimate;

        //update the discount when checkout.
        referral.remainingCredits = remainingCredits;
        UserService.discountInfo = referral;
      }
      else{
        $scope.promoCodeType = 'You have no credit, Share your code with friends to get discounts!';
      }
    };*/



    };
  });
