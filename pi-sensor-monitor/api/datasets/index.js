/**
 * Created by barte_000 on 2016-04-12.
 */
var models = require('../../models');
var seq = require('sequelize');

exports.getDataSets = function getDataSets(req, res){

    var params = JSON.parse(req.params.arguments);

    var includeElement = [{
        model: models.Sensor, attributes: ['id', 'name']
    },{
        model: models.Timestamp, attributes: ['id', "markTimestamp"]
    }];

    if(params.hasOwnProperty("sensor") || params.hasOwnProperty("Sensor")){
        console.log("%j", includeElement[0]);
        includeElement[0]["where"] ={
            "name": params.sensor
        };
    }

    var attrs = [];

    if(params.hasOwnProperty("fields")){
        for(var key in params["fields"]){
            if(params["fields"].hasOwnProperty(key))
                attrs.push(params["fields"][key]);
        }
    }

    if(attrs.length == 0){
        res.send(200);
        return;
    }

    var whereCondition = null;
    if(params.hasOwnProperty("dateFrom") || params.hasOwnProperty("dateTo")){
        whereCondition = {
            "markTimestamp" : {}
        };
        if(params.hasOwnProperty("dateFrom")){
            whereCondition["markTimestamp"]["$gte"] = params.dateFrom;
        }
        if(params.hasOwnProperty("dateTo")){
            whereCondition["markTimestamp"]["$lte"] = params.dateTo;
        }
    }

    includeElement[1]["where"] = whereCondition;

    models.Log.findAll({
        attributes: attrs,
        include:includeElement,
        order: "\"Timestamp\".\"markTimestamp\""
    }).then(function(item){

        var resData = {
            date: []
        };

        for(var key in item){
            if(item.hasOwnProperty(key)) {
                for (var fieldKey in attrs) {
                    if(attrs.hasOwnProperty(fieldKey)) {

                        // If db result element has field that we need in the dataset (attrs),
                        // then we check if it is in out data json.
                        // If so, then we push. Otherwise, we create one and push :)
                        if (item[key][attrs[fieldKey]]) {
                            if(!resData[attrs[fieldKey]]){
                                resData[attrs[fieldKey]] = [];
                            }
                            resData[attrs[fieldKey]].push(item[key][attrs[fieldKey]]);
                        }
                    }
                }

                resData["date"].push(item[key]["Timestamp"]["markTimestamp"]);
            }
        }

        res.send(resData);
    }).catch(function(error){
        res.send({error: error});
        console.log(error);
    });
};