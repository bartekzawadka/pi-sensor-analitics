/**
 * Created by barte_000 on 2016-04-11.
 */
var models = require('../models');
var Sequelize = require('sequelize');
//exports.datasets = require('./datasets');

exports.datasets = function getDataSets(req, res){

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
    var attrs = ["updatedAt"];

    if(params.hasOwnProperty("fields")){
        for(var key in params["fields"]){
            attrs.push(params["fields"][key]);
        }
    }

    console.log(attrs);

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