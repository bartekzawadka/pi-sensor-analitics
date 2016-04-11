var restify = require('restify');

var options = {
  name: "PiSensorMonitor"
};

var server = restify.createServer(options);

module.exports = server;

require('./routes');