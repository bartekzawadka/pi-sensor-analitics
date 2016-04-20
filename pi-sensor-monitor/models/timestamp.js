/**
 * Created by barte_000 on 2016-04-19.
 */
"use strict";

module.exports = function(sequelize, DataTypes){
    var Timestamp = sequelize.define("Timestamp",null, {
        timestamps: true,
        updatedAt: false,
        createdAt: 'markTimestamp'
    });
    return Timestamp;
};