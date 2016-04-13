/**
 * Created by barte_000 on 2016-04-12.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Log = sequelize.define("Log", {
        temperature: {
            type:DataTypes.FLOAT,
            allowNull: false
        },
        humidity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        activeFansNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        rpm:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        classMethods: {
            associate: function(models) {
                Log.belongsTo(models.Sensor, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Log;
};