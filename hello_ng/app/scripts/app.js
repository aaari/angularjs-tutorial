'use strict';

angular.module('helloNgApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/hello', {
        templateUrl: 'views/hello.html',
        controller: 'HelloCtrl'
      })
      .when('/form', {
        templateUrl: 'views/form.html',
        controller: 'FormCtrl'
      })
      .when('/mvc', {
        templateUrl: 'views/mvc.html',
        controller: 'MVCCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  });
