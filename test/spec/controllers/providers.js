'use strict';

describe('Controller: ProvidersCtrl', function () {

  // load the controller's module
  beforeEach(module('harvestWebApp'));

  var ProvidersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProvidersCtrl = $controller('ProvidersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
