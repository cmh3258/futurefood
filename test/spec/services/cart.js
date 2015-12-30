'use strict';

describe('Service: CartService', function () {

  // load the service's module
  beforeEach(module('harvestWebApp'));

  // instantiate service
  var cart;
  beforeEach(inject(function (_cart_) {
    cart = _cart_;
  }));

  it('should do something', function () {
    expect(!!cart).toBe(true);
  });

});
