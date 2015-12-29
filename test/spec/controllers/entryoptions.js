'use strict';

describe('Controller: EntryoptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('harvestWebApp'));

  var EntryoptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EntryoptionsCtrl = $controller('EntryoptionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
