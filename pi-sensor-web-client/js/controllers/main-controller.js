/**
 * Created by barte_000 on 2016-04-22.
 */
angular.module('starter').controller('MainCtrl', function($scope, $http, $mdSidenav, FiltersService, $rootScope){

  $scope.getDataEnabled = true;
  $scope.fieldsToQuery = [];

  FiltersService.subscribeFiltersUpdated($scope, function(){
    getData();
  });

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle();
    }
  }

  $scope.toggleMenu = buildToggler('sn');

  $scope.getData = function(){
    getData();
  };

  function loadDataset(dates, parameterData, parameterName){

    if(!dates || !parameterData || !parameterName)
      return;

    var chartInfo = {
      "labels": dates,
      "data": [],
      "series": [],
      "name": parameterName
    };

    for(var x in parameterData){
      if(parameterData.hasOwnProperty(x)){
        chartInfo.series.push(x);
        chartInfo.data.push(parameterData[x]);
      }
    }

    if(!$scope.charts){
      $scope.charts = {};
    }

    $scope.charts[parameterName] = chartInfo;
  }

  function resetCharts(){
    var filters = FiltersService.getFilters();

    if(!filters || !filters.parameters)
      return;

    $scope.charts = {};

    // for(var k in filters.parameters){
    //   if(filters.parameters.hasOwnProperty(k)){
    //     $scope[filters.parameters[k]["id"]] = {}; // reseting old chart data or creating new if not existing
    //   }
    // }
  }

  function getData(){

    $scope.getDataEnabled = false;

    var fieldsToQuery = [];
    var lastFilters = FiltersService.getFilters();
    if(!lastFilters.parameters)
      return;

    for(var k in lastFilters.parameters){
      if(lastFilters.parameters.hasOwnProperty(k)){
        if(lastFilters.parameters[k]["enabled"]){
          fieldsToQuery.push(lastFilters.parameters[k]["id"]);
        }
      }
    }

    var query = {
      "arguments": {
        "dateFrom": lastFilters.dateFrom,
        "dateTo": lastFilters.dateTo,
        "fields": fieldsToQuery
      }
    };

    if(lastFilters.hasOwnProperty("sensors")) {
      var sensorsToRequest = [];
      for (var k in lastFilters.sensors){
        if(lastFilters.sensors.hasOwnProperty(k)){
          if(lastFilters.sensors[k].enabled) {
            sensorsToRequest.push(lastFilters.sensors[k].name);
          }
        }
      }

      query.arguments["sensors"] = sensorsToRequest;
    }

    $http({
      url: applicationConfig.piSensorMonitorAddress + "api/datasets/",
      method: 'GET',
      data: query,
      body: query,
      params: query,
      headers: {'Content-Type':'application/json'}
    }).then(function(value){
      
      resetCharts();

      var data = value.data;
      if(!data)
        return;

      // Formatting labels:
      var labelsFormatted = [];
      for(var k in data.date){
        if(data.date.hasOwnProperty(k)) {
          var df = new Date(data.date[k]);
          labelsFormatted.push(df.yyyymmddhhmm());
        }
      }

      if(!lastFilters || !lastFilters.hasOwnProperty("parameters"))
        return;

      var info = {};
      var parameterName = null;

      for(var k in lastFilters.parameters){
        parameterName = lastFilters.parameters[k]["id"];
        info = data[parameterName];
        if(!info)
          continue;

        loadDataset(labelsFormatted, info, parameterName);
      }
      //
      // var json = {
      //   "series": ["SeriesA", "SeriesB"],
      //   "data":[data1, data2],
      //   "labels": labelsFormatted
      // };
      //
      // $scope.chartInfo = json;

      $scope.getDataEnabled = true;

    }, function(e){
      console.log(e);
      $scope.getDataEnabled = true;
    });

  };

});
