// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMaterial', 'chart.js'])

.controller('MainCtrl', function($scope, $http, $mdSidenav){
  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle();
    }
  }

  Date.prototype.yyyymmddhhmm = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    return "".concat(yyyy+'-').concat(mm+'-').concat(dd+' ').concat(hh+':').concat(min);
  };

  $scope.aaa = buildToggler('sn');

  var query = {
    "arguments": {
      "dateFrom": new Date('2016-04-19').toISOString(),
      "dateTo": new Date('2016-04-20').toISOString(),
      "fields": ["temperature"],
      //"sensor":"Sensor1"
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
    
  }, function(e){
    console.log(e);
  });
})

  .controller('SideNavCtrl', function($scope, $mdSidenav){
    $scope.close = function(){
      $mdSidenav('sn').close();
    }
  })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(function (ChartJsProvider) {
    ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
  });
