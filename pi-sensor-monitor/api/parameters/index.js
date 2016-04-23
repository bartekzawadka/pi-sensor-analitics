/**
 * Created by barte_000 on 2016-04-22.
 */
var models = require('../../models');
var seq = require('sequelize');

exports.getParameters = function getFields(req, res){
    var Log = models.Log.build();
    var fields = Object.getPrototypeOf(Log).attributes;

    var result = [];
    var fieldsLowered = [];

    for(var k in fields){
        if(fields.hasOwnProperty(k)){
            fieldsLowered.push(fields[k].toLocaleLowerCase());
        }
    }

    for(var key in fieldsLowered){
        if(fieldsLowered.hasOwnProperty(key)) {
            if(fieldsLowered[key].indexOf('id') == 0 ||
                (fieldsLowered[key].length > 2 && fieldsLowered[key].substring(fieldsLowered[key].length - 2, fieldsLowered[key].length) == 'id' )||
                fieldsLowered[key].indexOf('timestamp') > -1){
                continue;
            }else{
                var element = {"id": fields[key], "name" : getRepresentativeFieldName(fields[key])};
                result.push(element);
            }
        }
    }

    res.send(result);
};

function getRepresentativeFieldName(fieldName){
    if(!fieldName)
        return fieldName;

    var i = 0;
    var result = '';
    var char = '';

    while (i <= fieldName.length){
        char = fieldName.charAt(i);
        if(i == 0){
            result = result + char.toUpperCase();
        }else{
            if(!isNaN(char * 1) || char == char.toLowerCase()){
                result = result + char;
            }else{
                result = result + ' ' + char;
            }
        }
        i++;
    }

    return result;
}