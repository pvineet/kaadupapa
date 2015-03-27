'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform, $cordovaGeolocation, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    $cordovaGeolocation.getCurrentPosition().then(function(position, geoLocation) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        //geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
        $rootScope.lat = position.coords.latitude;
        $rootScope.long = position.coords.longitude;
    },
    function (err) {
        //
    });

  });
})

/*.run(function ($ionicPlatform, $ionicPlatform, $cordovaGeolocation, geoLocation) {
  $ionicPlatform.ready(function () {
  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
    // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $cordovaGeolocation.getCurrentPosition().then(function(position) {
        geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude)
    },
    function (err) {
        geoLocation.setGeolocation(37.38, -122.09)
    });

      // begin a watch
    var options = {
      frequency: 1000,
      timeout: 3000,
      enableHighAccuracy: true
    };

    var watch = $cordovaGeolocation.watchPosition(options);
    
    watch.promise.then(function () {
    // Not  used 
    },
    function(err) {
      geoLocation.setGeolocation(37.38, -122.09)
    }, 
    function (position) {
      geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude)
    });
  });
})*/
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html'
      }
    }
  })
  
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  
  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })
  
  .state('app.habitat', {
    url: '/habitat',
    views: {
      'menuContent': {
        templateUrl: 'templates/add_habitat.html',
        controller: 'HabitatsCtrl'
      }
    }
  })
  
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
