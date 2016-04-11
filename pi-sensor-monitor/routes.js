/**
 * Created by barte_000 on 2016-04-11.
 */
var server = require('./server');
var api = require('./api');

server.get('/api/datasets/temperature/:period', api.datasets.temperature);