/**
 * Created by barte_000 on 2016-04-22.
 */
var applicationConfig = {
  "piSensorMonitorAddress": "http://barser.com:999/"
};

angular.module('starter').config(function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
});
