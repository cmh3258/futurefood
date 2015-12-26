'use strict';

describe('Service: ScraperService', function () {

  // load the service's module
  beforeEach(module('harvestWebApp'));

  // instantiate service
  var ScraperService;
  beforeEach(inject(function (_ScraperService_) {
    ScraperService = _ScraperService_;
  }));

  it('should do something', function () {
    expect(!!ScraperService).toBe(true);
  });

});
