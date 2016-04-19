/**
 * Created by barte_000 on 2016-04-12.
 */
var models = require('../../models');

exports.getDataSets = function getDataSets(req, res){

    var params = JSON.parse(req.params.arguments);

    var includeElement = [{
        model: models.Sensor, attributes: ['id', 'name']
    },{
        model: models.Timestamp, attributes: ['id', "\"createdAt\""]
    }];

    if(params.hasOwnProperty("sensor") || params.hasOwnProperty("Sensor")){
        console.log("%j", includeElement[0]);
        includeElement[0]["where"] ={
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
            "createdAt" : {}
        };
        if(params.hasOwnProperty("dateFrom")){
            whereCondition["createdAt"]["$gte"] = params.dateFrom;
        }
        if(params.hasOwnProperty("dateTo")){
            whereCondition["createdAt"]["$lte"] = params.dateTo;
        }
    }

    includeElement[1]["where"] = whereCondition;

    models.Log.findAll({
        attributes: attrs,
        include:includeElement,
        order: "\"Timestamp\".\"createdAt\""
    }).then(function(item){
        res.send(item);
    }).catch(function(error){
        res.send({error: error});
        console.log(error);
    });
};