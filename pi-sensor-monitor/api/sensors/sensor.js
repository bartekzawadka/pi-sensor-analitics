/**
 * Created by barte_000 on 2016-04-16.
 */
var models = require('../../models');

module.exports = function getSensor(req, res){
    models.Sensor.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name'],
        order: 'name'
    }).then(function(item){
        res.send(item);
    }).catch(function(error){
        if(!error || Object.keys(error).length === 0){
            res.send({error: "Specified sensor was not found"});
        }else {
            res.send({error: error});
        }
    });
};