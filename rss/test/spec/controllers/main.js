'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('rssApp', 'mockedFeed'));

  var MainCtrl, scope, mockedFeed, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, defaultJSON) {
    httpBackend = $httpBackend;
    $httpBackend.whenJSONP(/query.yahooapis.com/).respond(defaultJSON);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of feeds', function () {
    expect(scope.feeds.length).toBe(2);
    scope.fetchFeed(scope.feeds[0]);
    httpBackend.flush();
    expect(scope.feeds[0].items[0].title).toBe('Node Roundup: 0.11.2, 0.10.6, subscribe, Omelette');
    expect(scope.feeds[0].items[1].title).toBe('にほんごのてすと');
    expect(scope.feeds[1].items.length).toBe(0);
    scope.fetchFeed(scope.feeds[1]);
    httpBackend.flush();
    expect(scope.feeds[1].items.length).toBe(3);
  });
});
