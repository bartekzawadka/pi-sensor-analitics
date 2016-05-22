/**
 * Created by barte_000 on 2016-04-22.
 */
angular.module('starter').controller('SideNavCtrl', function($scope, $mdSidenav, FiltersService){

  var filters = FiltersService.getFilters();

  $scope.dateFrom = filters.dateFrom;
  $scope.dateTo = filters.dateTo;
  $scope.parameters = [];
  $scope.sensors = [];

  FiltersService.subscribeFiltersUpdated($scope, function(scope, data) {
    $scope.parameters = data.parameters;
    $scope.sensors = data.sensors;
    $scope.dateFrom = data.dateFrom;
    $scope.dateTo = data.dateTo;
  });

  FiltersService.fetchFilterValues();

  $scope.close = function(){
    $mdSidenav('sn').close();
  };

  $scope.ok = function(){

    var filters = FiltersService.getFilters();
    filters.dateFrom = $scope.dateFrom;
    filters.dateTo = $scope.dateTo;
    filters.parameters = $scope.parameters;
    filters.sensors = $scope.sensors;

    FiltersService.updateFilters(filters);
    $mdSidenav('sn').close();
  }
});
