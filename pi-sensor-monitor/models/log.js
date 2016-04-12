/**
 * Created by barte_000 on 2016-04-12.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Log = sequelize.define("Log", {
        temperature: DataTypes.FLOAT,
        humidity: DataTypes.FLOAT
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