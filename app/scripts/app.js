'use strict';

angular
  .module('phoneApp', [
    'ngResource',
    'ngRoute',
    'Words.factories'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('Words.factories', []);