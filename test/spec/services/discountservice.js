'use strict';

describe('Service: DiscountService', function () {

  // load the service's module
  beforeEach(module('harvestWebApp'));

  // instantiate service
  var DiscountService;
  beforeEach(inject(function (_DiscountService_) {
    DiscountService = _DiscountService_;
  }));

  it('should do something', function () {
    expect(!!DiscountService).toBe(true);
  });

});
