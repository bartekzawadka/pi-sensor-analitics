/**
 * Created by barte_000 on 2016-04-23.
 */
angular.module('starter').factory('FiltersService', function($rootScope, $http, $q){

  var dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - 1);
  var filters = {"parameters": [], "sensors": [], "dateFrom": dateFrom, "dateTo": new Date()};

  var fetchFilterValues = function(){

    $q.all([$http({
      url: applicationConfig.piSensorMonitorAddress + "api/parameters",
      method: 'GET'}
    ), $http({
      url: applicationConfig.piSensorMonitorAddress + "api/sensors",
      method: 'GET'})]).then(function(data){
      if(data[0] && data[0].data && data[0].data.length>0) {

        for (var k in data[0].data) {
          if (data[0].data.hasOwnProperty(k)) {
            if (data[0].data[k]) {
              var element = {
                id: data[0].data[k]["id"],
                name: data[0].data[k]["name"],
                enabled: false
              };

              if (data[0].data[k]["id"] && (data[0].data[k]["id"].indexOf('temperature') > -1 || data[0].data[k]["id"].indexOf('humidity') > -1)) {
                element.enabled = true;
              }

              filters.parameters.push(element);
            }
          }
        }
      }

      if(data[1] && data[1].data && data[1].data.length>0) {

        for (var k in data[1].data) {
          if (data[1].data.hasOwnProperty(k)) {
            if (data[1].data[k]) {
              var element = {
                name: data[1].data[k]["name"],
                id: data[1].data[k]["id"],
                enabled: true
              };

              filters.sensors.push(element);
            }
          }
        }
      }

      $rootScope.$emit('filters-updated', filters);
    }, function(e){
      console.log(e);
    });
  };

  return {
    fetchFilterValues: fetchFilterValues,
    getFilters: function() {
      return filters;
    },
    updateFilters: function(data){
      filters = data;
      $rootScope.$emit('filters-updated', data);
    },
    subscribeFiltersUpdated: function(scope, callback){
      var handler = $rootScope.$on('filters-updated', callback);
      scope.$on('$destroy', handler);
    }
  }

});
