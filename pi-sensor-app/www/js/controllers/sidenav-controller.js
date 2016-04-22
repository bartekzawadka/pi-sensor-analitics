/**
 * Created by barte_000 on 2016-04-22.
 */
angular.module('starter').controller('SideNavCtrl', function($scope, $mdSidenav, $http){
  $scope.close = function(){
    $mdSidenav('sn').close();
  };

  var currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  $scope.dateFrom = currentDate;
  $scope.dateTo = new Date();

  $scope.settings = [];
  $scope.sensors = [];

  getAvailableParameters();
  getSensors();

  function getAvailableParameters() {
    $http({
      url: "http://localhost:8080/api/parameters",
      method: 'GET'}).then(function(data){

      if(data && data.data && data.data.length>0){

        var settings = [];
        $scope.fieldsToQuery = [];

        for(var k in data.data){
          if(data.data.hasOwnProperty(k)){
            if(data.data[k]) {
              var element = {
                name: data.data[k]["name"],
                enabled: false
              };

              if (data.data[k]["id"] && (data.data[k]["id"].indexOf('temperature') > -1 || data.data[k]["id"].indexOf('humidity')>-1)) {
                element.enabled = true;
                $scope.fieldsToQuery.push(data.data[k]["name"]);
              }

              settings.push(element);
            }
          }
        }

        $scope.settings = settings;
      }

    }, function(e){
      console.log(e);
    })
  }

  function getSensors(){
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

        $scope.sensors = sensors;
      }

    }, function(e){
      console.log(e);
    })
  }

  $scope.ok = function(){
    $scope.fieldsToQuery = [];
    for(var k in $scope.settings){
      if($scope.settings[k]["enabled"]) {
        $scope.fieldsToQuery.push($scope.settings[k]["name"]);
      }
    }
    $scope.getData();
    $mdSidenav('sn').close();
  }
});
