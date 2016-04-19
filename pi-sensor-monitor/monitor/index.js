/**
 * Created by barte_000 on 2016-04-12.
 */
var restify = require('restify');
var cronJob = require('cron').CronJob;
var models = require('../models');
var nconf = require('nconf');
var util = require('util');
var sequelize = require('sequelize');

var client = restify.createJsonClient({
    url: util.format("http://%s:%s",nconf.get("pi-sensor-service:address"), nconf.get("pi-sensor-service:port"))
});

//"request-frequency-cron": "0 */10 * * * *"
new cronJob(nconf.get("pi-sensor-service:request-frequency-cron"), function(){
    client.get('/get_temp_hum', function (err, req, res, obj) {
        console.log('Server returned: %j', obj);

        if(!obj){
            return;
        }

        models.Timestamp.create().then(function(timestamp) {

            for (var sensor in obj){
                writeSensorData(sensor, obj, timestamp.id);
            }

        }).catch(function(error){
            console.log("Timestamp adding failed. Record registration failed:");
            console.log(error);
        });

    });
}, null, true);

function writeSensorData(sensorName, data, timestampId){
    models.Sensor.findOne({where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), sensorName.toLowerCase()), attributes: ['id']}).then(function(sensorObj){

            if(!sensorObj || !sensorObj.id){
                console.log("'%s' not found in database.", sensorName);
                console.log("Creating sensor '%s' entry", sensorName);
                models.Sensor.create({
                    name: sensorName
                }).then(function(addedSensor){
                    console.log("Sensor '%s' entry added successfully", sensorName);

                    writeLogRecord(sensorName, data, addedSensor.id, timestampId);
                }).catch(function(error){
                    console.log("Sensor '%s' entry adding failed!", sensorName);
                    console.log(error);
                });
            }else{
                writeLogRecord(sensorName, data, sensorObj.id, timestampId);
            }



    })
}

function writeLogRecord(key, obj, sensorId, timestampId) {

    if(!obj[key])
    {
        console.log("Element %s of record to write is empty", key);
        return;
    }

    if(!obj[key].temperature)
    {
        console.log("Sensor data element has invalid format: Temperature data is empty");
        return;
    }

    if(!obj[key].humidity){
        console.log("Sensor data element has invalid format: Humidity data is empty");
        return;
    }

    models.Log.create({
        "SensorId": sensorId,
        "TimestampId": timestampId,
        temperature: obj[key].temperature,
        humidity: obj[key].humidity
    }).catch(function(error){
        console.log("%s failed!", sensor);
        console.log(error);
    });
}

