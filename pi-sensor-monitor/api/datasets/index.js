/**
 * Created by barte_000 on 2016-04-12.
 */
var models = require('../../models');

exports.getDataSets = function getDataSets(req, res){

    var params = JSON.parse(req.params.arguments);

    var includeElement = {
        model: models.Sensor, attributes: ['id', 'name']
    };

    if(params.hasOwnProperty("sensor") || params.hasOwnProperty("Sensor")){
        includeElement["where"] ={
            "name": params.sensor
        };
    }

    var attrs = ["updatedAt"];

    if(params.hasOwnProperty("fields")){
        for(var key in params["fields"]){
            if(params["fields"].hasOwnProperty(key))
                attrs.push(params["fields"][key]);
        }
    }

    var whereCondition = null;
    if(params.hasOwnProperty("dateFrom") || params.hasOwnProperty("dateTo")){
        whereCondition = {
            "updatedAt" : {}
        };
        if(params.hasOwnProperty("dateFrom")){
            whereCondition["updatedAt"]["$gte"] = params.dateFrom;
        }
        if(params.hasOwnProperty("dateTo")){
            whereCondition["updatedAt"]["$lte"] = params.dateTo;
        }
    }

    models.Log.findAll({
        where: whereCondition,
        attributes: attrs,
        include:[includeElement],
        order: "\"updatedAt\""
    }).then(function(item){
        res.send(item);
    }).catch(function(error){
        res.send({error: error});
    });
};