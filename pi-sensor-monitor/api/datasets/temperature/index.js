/**
 * Created by barte_000 on 2016-04-14.
 */
var models = require('../../../models');
var Sequelize = require('sequelize');

exports.all = function getTempLogs(req, res){

    var params = JSON.parse(req.params.arguments);

    var includeElement = {
        model: models.Sensor, attributes: ['name']
    };

    if(params.hasOwnProperty("sensor") || params.hasOwnProperty("Sensor")){
        includeElement["where"] ={
            "name": params.sensor
        };
    }

    //var attrs = ["updatedAt", 'temperature', 'humidity', "activeFansNo", 'rpm'];
    var attrs = ["updatedAt", 'temperature'];

    models.Log.findAll({
        where: {
            "updatedAt": {
                $gte: params.dateFrom,
                $lte: params.dateTo
            }
        },
        attributes: attrs,
        include:[includeElement],
        order: "\"updatedAt\""
    }).then(function(item){
        res.send(item);
    }).catch(function(error){
        res.send({error: error});
    });
};

exports.sensor = function getTempsForSingleSensor(req, res){

};