'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $location, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SettingsCtrl', function($scope, $stateParams) {
})

.controller('HomeCtrl', function($scope, $state, $stateParams) {
  console.log('on home page');
  $scope.gotoHabitat = function(){
    console.log('go to habitat');
    $state.transitionTo('app.habitat');
  };
})

.controller('HabitatsCtrl',function($scope, $stateParams, $cordovaGeolocation, $rootScope, $log, $cordovaCamera) {
  document.addEventListener('deviceready', function (){
    $cordovaGeolocation.getCurrentPosition().then(function(position, geoLocation) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        //geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
    },
    function (err) {
        //
    });
    console.log($scope.lat);
    console.log($scope.long);
    $scope.map = { center: { latitude: $scope.lat, longitude: $scope.long }, zoom: 14 };
    $scope.marker = {
      id: 0,
      coords: {
        latitude: $scope.lat,
        longitude: $scope.long
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          $scope.lat = marker.getPosition().lat();
          $scope.long = marker.getPosition().lng();

          $scope.marker.options = {
            draggable: true,
            labelContent: 'lat: ' + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: '100 0',
            labelClass: 'marker-labels'
          };
        }
      }
    };
  });

  $scope.getPhoto = function() {
    document.addEventListener("deviceready", function () {

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        /*var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;*/
        $scope.photo = "data:image/jpeg;base64," + imageData;
        onImageSuccess(imageData);
 
        function onImageSuccess(fileURI) {
          createFileEntry(fileURI);
        }
 
        function createFileEntry(fileURI) {
          window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
        }

        function copyFile(fileEntry) {
          var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
          var newName = makeid() + name;
 
          window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
            fileEntry.copyTo(fileSystem2, newName, onCopySuccess, fail);
          },
          fail);
        }
        
        function onCopySuccess(entry) {
          $scope.$apply(function () {
            $scope.images.push(entry.nativeURL);
          });
        }

        function fail(error) {
          console.log("fail: " + error.code);
        }
	      
        function makeid() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
         
          for (var i=0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        }
 
      }, function(err) {
        // error
      });

    }, false);
  };


  //geoLocation.setGeolocation($scope.lat, $scope.long);
  /*var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat  = position.coords.latitude;
      $scope.long = position.coords.longitude;
    }, function(err) {
      // error
    });


  var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
  });


  watch.clearWatch();*/
});
