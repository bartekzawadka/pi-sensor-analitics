/**
 * Created by barte_000 on 2016-04-11.
 */
var server = require('./server');
var api = require('./api');

server.get('/api/datasets/:arguments', api.datasets.getDataSets);
server.get('/api/sensors', api.sensors.all);
server.get('/api/sensor/:id', api.sensors.sensor);