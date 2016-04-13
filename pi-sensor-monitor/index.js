/**
 * Created by barte_000 on 2016-04-11.
 */
var server = require('./server');
var models = require('./models');
var nconf = require('nconf');

var port = Number(process.env.SERVER_PORT) ||  8080;

nconf.file("config\\config.json");
//nconf.use('file', {'file':"config\\tmp_conf.json"});

nconf.defaults({
   "pi-sensor-service" : {
      "address": "192.168.1.106",
      "port": "888",
      "request-frequency-cron": "0 * * * * *"
   }
});

models.sequelize.sync().then(function(){
   server.listen(port, function(){
      console.log('PiSensorMonitor listening on %j', server.address());
   });
});

require('./monitor');