/**
 * Created by barte_000 on 2016-04-16.
 */
var models = require('../../models');

module.exports = function getAllSensors(req, res){
    models.Sensor.findAll({attributes: ['id', 'name'], order: 'name'}).then(function(items){
        res.send(items);
    }).catch(function(error){
        res.send({error: error});
    });
};