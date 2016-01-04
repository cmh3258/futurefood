'use strict';

describe('Service: ProviderService', function () {

  // load the service's module
  beforeEach(module('harvestWebApp'));

  // instantiate service
  var ProviderService;
  beforeEach(inject(function (_ProviderService_) {
    ProviderService = _ProviderService_;
  }));

  it('should do something', function () {
    expect(!!ProviderService).toBe(true);
  });

});
