/**
 * Created by barte_000 on 2016-04-23.
 */
angular.module('starter').factory('SettingsService', function($rootScope, $http){

  var lastSettings = {"parameters": [], "sensors": []};

  var notifyParameters = function(data){
    lastSettings.parameters = data;
    $rootScope.$emit('settings-parameters-updated', data);
  };

  var notifySensors = function(data){
    lastSettings.sensors = data;
    $rootScope.$emit('settings-sensors-updated', data);
  };

  return{
    getLastSettings: function(){
      return lastSettings;
    },
    getParameters: function(){
      $http({
        url: "http://localhost:8080/api/parameters",
        method: 'GET'}
      ).then(function(data){

        if(data && data.data && data.data.length>0) {

          var settings = [];

          for (var k in data.data) {
            if (data.data.hasOwnProperty(k)) {
              if (data.data[k]) {
                var element = {
                  id: data.data[k]["id"],
                  name: data.data[k]["name"],
                  enabled: false
                };

                if (data.data[k]["id"] && (data.data[k]["id"].indexOf('temperature') > -1 || data.data[k]["id"].indexOf('humidity') > -1)) {
                  element.enabled = true;
                }

                settings.push(element);
              }
            }
          }

          notifyParameters(settings);
        }
      }, function(e){
        console.log(e);
      })
    },
    getSensors: function(){
      $http({
        url: "http://localhost:8080/api/sensors",
        method: 'GET'}).then(function(data){

        if(data && data.data && data.data.length>0){

          var sensors = [];

          for(var k in data.data){
            if(data.data.hasOwnProperty(k)){
              if(data.data[k]) {
                var element = {
                  name: data.data[k]["name"],
                  id: data.data[k]["id"],
                  enabled: true
                };

                sensors.push(element);
              }
            }
          }

          notifySensors(sensors);
        }

      }, function(e){
        console.log(e);
      })
    },
    subscribeParameters: function(scope, callback){
      var handler = $rootScope.$on('settings-parameters-updated', callback);
      scope.$on('$destroy', handler);
    },
    subscribeSensors: function (scope, callback) {
      var handler = $rootScope.$on('settings-sensors-updated', callback);
      scope.$on('$destroy', handler);
    },
    notifyParameters: notifyParameters,
    notifySensors: notifySensors
  }
});
