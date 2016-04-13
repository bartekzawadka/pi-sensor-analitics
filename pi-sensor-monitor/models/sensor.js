/**
 * Created by barte_000 on 2016-04-12.
 */
"use strict";

module.exports = function(sequelize, DataTypes){

    var Sensor = sequelize.define("Sensor", {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        classMethods:{
            associate: function(models){
                Sensor.hasMany(models.Log)
            }
        }
    });

    return Sensor;
};