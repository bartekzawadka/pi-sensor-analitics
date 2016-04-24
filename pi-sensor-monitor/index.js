/**
 * Created by barte_000 on 2016-04-11.
 */
var server = require('./server');
var models = require('./models');
var nconf = require('nconf');
var path = require('path');

nconf.file(path.join('config', 'config.json'));

nconf.defaults({
   "pi-sensor-service" : {
      "address": "192.168.1.106",
      "port": "888",
      "request-frequency-cron": "0 */10 * * * *"
   },
   "server-port": 8080
});

var port = Number(process.env.SERVER_PORT);
if(!port){
   port = nconf.get("server-port");
}

models.sequelize.sync().then(function(){
   server.listen(port, function(){
      console.log('PiSensorMonitor listening on %j', server.address());
   });
});

require('./monitor');
require('./api/common/utils');