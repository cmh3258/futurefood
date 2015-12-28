'use strict';

describe('Service: RestaurantService', function () {

  // load the service's module
  beforeEach(module('harvestWebApp'));

  // instantiate service
  var RestaurantService;
  beforeEach(inject(function (_RestaurantService_) {
    RestaurantService = _RestaurantService_;
  }));

  it('should do something', function () {
    expect(!!RestaurantService).toBe(true);
  });

});
