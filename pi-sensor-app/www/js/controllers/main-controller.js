/**
 * Created by barte_000 on 2016-04-22.
 */
angular.module('starter').controller('MainCtrl', function($scope, $http, $mdSidenav){

  $scope.getDataEnabled = true;
  $scope.fieldsToQuery = [];

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle();
    }
  }

  $scope.toggleMenu = buildToggler('sn');

  var query = {
    "arguments": {
      "dateFrom": new Date('2016-04-20').toISOString(),
      "dateTo": new Date('2016-04-21').toISOString(),
      "fields": ["temperature", "humidity"],
      //"sensor":"Sensor1"
    }
  };

  $scope.getData = function(){
    getData();
  };

  getData();

  function getData(){

    console.log("GET DATA FIRED!");

    $scope.getDataEnabled = false;

    var query = {
      "arguments": {
        "dateFrom": $scope.dateFrom,
        "dateTo": $scope.dateTo,
        "fields": $scope.fieldsToQuery
      }
    };

    $http({
      url: "http://localhost:8080/api/datasets/",
      method: 'GET',
      data: query,
      body: query,
      params: query,
      headers: {'Content-Type':'application/json'}
    }).then(function(value){

      var data1 = [];
      var data2 = [];
      var labels = [];

      for(var i in value.data){
        if(value.data.hasOwnProperty(i)) {

          if(value.data[i]["Sensor"]["name"]){
            var n = value.data[i]["Sensor"]["name"];
            if(n == "Sensor1"){
              data1.push(value.data[i]["temperature"]);
              labels.push(value.data[i]["updatedAt"]);
            }else{
              data2.push(value.data[i]["temperature"]);
            }

          }

        }
      }

      var labelsFormatted = [];
      for(var key in labels){
        if(labels.hasOwnProperty(key)){
          var df = new Date(labels[key]);
          labelsFormatted.push(df.yyyymmddhhmm());
        }
      }

      var json = {
        "series": ["SeriesA", "SeriesB"],
        "data":[data1, data2],
        "labels": labelsFormatted
      };

      $scope.chartInfo = json;

      $scope.getDataEnabled = true;

    }, function(e){
      console.log(e);
      $scope.getDataEnabled = true;
    });

  };

});
