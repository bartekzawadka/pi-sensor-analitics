/**
 * Created by barte_000 on 2016-04-11.
 */
var server = require('./server');
var api = require('./api');

server.get('/api/datasets/temperature/:arguments', api.datasets.temperature.all);
//server.get('/api/datasets/temperature/sensor/:params', api.datasets.temperature.sensor);