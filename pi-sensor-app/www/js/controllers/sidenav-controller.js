/**
 * Created by barte_000 on 2016-04-22.
 */
angular.module('starter').controller('SideNavCtrl', function($scope, $mdSidenav, SettingsService){
  $scope.close = function(){
    $mdSidenav('sn').close();
  };

  var currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  $scope.dateFrom = currentDate;
  $scope.dateTo = new Date();

  $scope.settings = [];
  $scope.sensors = [];

  SettingsService.subscribeParameters($scope, function(scope, data){
    $scope.settings = data;
  });

  SettingsService.subscribeSensors($scope, function(scope, data){
    $scope.sensors = data;
  });

  SettingsService.getParameters();
  SettingsService.getSensors();

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
