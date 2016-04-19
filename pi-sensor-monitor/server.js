var restify = require('restify');

var options = {
  name: "PiSensorMonitor"
};
//
 var server = restify.createServer(options);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

module.exports = server;

require('./routes');