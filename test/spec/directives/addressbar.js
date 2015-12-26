'use strict';

describe('Directive: addressbar', function () {

  // load the directive's module
  beforeEach(module('harvestWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<addressbar></addressbar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the addressbar directive');
  }));
});
