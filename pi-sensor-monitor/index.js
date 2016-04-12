/**
 * Created by barte_000 on 2016-04-11.
 */
var server = require('./server');
var models = require('./models');

var port = Number(process.env.SERVER_PORT) ||  8080;

models.sequelize.sync().then(function(){
   server.listen(port, function(){
      console.log('PiSensorMonitor listening on %j', server.address());
   });
});