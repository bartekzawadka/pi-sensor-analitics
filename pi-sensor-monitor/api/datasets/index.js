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

    if(params.hasOwnProperty("sensors")){

        if(Object.prototype.toString.call(params.sensors) === '[object Array]'){

            var arr = [];
            for(var k in params.sensors){
                if(params.sensors.hasOwnProperty(k)) {
                    arr.push({
                        "name": params.sensors[k]
                    });
                }
            }

            includeElement[0]["where"] = {
                "$or" : arr
            }
        }else{
            includeElement[0]["where"] ={
                "name": params.sensors
            };
        }
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

        var sensorData = {};

        for(var key in item){
            if(item.hasOwnProperty(key)) {
                for (var fieldKey in attrs) {
                    if(attrs.hasOwnProperty(fieldKey)) {

                        // If db result element has field that we need in the dataset (attrs),
                        // then we check if it is in out data json.
                        // If so, then we push. Otherwise, we create one and push :)
                        if (item[key][attrs[fieldKey]]) {
                            if(!resData[attrs[fieldKey]]){
                                resData[attrs[fieldKey]] = {};
                            }

                            //
                            sensorData = item[key]["Sensor"];

                            if(!resData[attrs[fieldKey]][sensorData["name"]]){
                                resData[attrs[fieldKey]][sensorData["name"]] = [];
                            }

                            resData[attrs[fieldKey]][sensorData["name"]].push(item[key][attrs[fieldKey]]);
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