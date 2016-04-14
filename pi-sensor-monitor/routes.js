/**
 * Created by barte_000 on 2016-04-11.
 */
var server = require('./server');
var api = require('./api');

server.get('/api/datasets/temperature/all/:dateFrom/:dateTo', api.datasets.temperature.all);
server.get('/api/datasets/temperature/sensor/:sensorId/:dateFrom/:dateTo', api.datasets.temperature.sensor);