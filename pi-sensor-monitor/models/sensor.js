/**
 * Created by barte_000 on 2016-04-12.
 */
"use strict";

module.exports = function(sequelize, DataTypes){

    var Sensor = sequelize.define("Sensor", {
        name: DataTypes.STRING
    }, {
        classMethods:{
            associate: function(models){
                Sensor.hasMany(models.Log)
            }
        }
    });

    return Sensor;
};

// module.exports = function(sequelize, DataTypes) {
//     var User = sequelize.define("User", {
//         username: DataTypes.STRING
//     }, {
//         classMethods: {
//             associate: function(models) {
//                 User.hasMany(models.Task)
//             }
//         }
//     });
//
//     return User;
// };