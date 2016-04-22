/**
 * Created by barte_000 on 2016-04-22.
 */
angular.module('starter').controller('SideNavCtrl', function($scope, $mdSidenav){
  $scope.close = function(){
    $mdSidenav('sn').close();
  };

  $scope.myDate = new Date();

  $scope.settings = [
    {name: "Temperatura",enabled:true},
    {name: "Wilgotność",enabled:false}
  ];
  $scope.sensors = [
    {name: "Sensor1",enabled:true},
    {name: "Sensor2",enabled:false}
  ];

  $scope.ok = function(){
    //todo: DO STUFF, AND:
    $mdSidenav('sn').close();
  }
});
