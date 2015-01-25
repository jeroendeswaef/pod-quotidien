(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert('tappaed');
      }, 100);
    };
  });

  module.controller('DetailController', function($scope, $data, $http) {
      $scope.doDownload = function() {
          console.info("clicked download", typeof $http);

          $http.get('foobar').
          success(function(data, status) {
              console.info("success");
          }).
          error(function(data, status) {
             console.info("error");
          });

      };
  });


  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;  
    
    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
    };
  });

  module.factory('$data', function() {
      var data = {};
      
      data.items = [
          { 
              title: 'Rfi - Le journal en français facile',
              desc: "Un journal qui présente l'actualité avec des mots simples et explique les événements dans leur contexte."
          }
      ]; 
      
      return data;
  });
})();

