'use strict';

var res = angular.module('resources.all', ['ngCordova']);
res
  .factory('$localStorage', ['$window', function ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },  
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    };
  }])
  
  .factory('geoLocation', function ($localStorage) {
    return {
      setGeolocation: function (latitude, longitude) {
        var _position = {
          latitude: latitude,
          longitude: longitude
        };
        $localStorage.setObject('geoLocation', _position);
      },
      getGeolocation: function () {
        var glocation = {
          lat: $localStorage.getObject('geoLocation').latitude,
          lng: $localStorage.getObject('geoLocation').longitude
        };
        return glocation;
      }
    };
  });

