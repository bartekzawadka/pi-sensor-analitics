/**
 * Created by barte_000 on 2016-05-03.
 */
var util = require('util');

var method = FanControl.prototype;

function FanControl(){
    this._lastRpm = 0;
    this._lastNumberOfFans = 1;
}

method.getLastNumberOfFans = function(){
    return this._lastNumberOfFans;
};

method.getLastRpm = function(){
    return this._lastRpm;
};

method.calculateFansParameters = function(client, value){
    if(!value)
        return;

    var temps = [];
    for(var key in value){
        if(value.hasOwnProperty(key)) {
            if (value[key]){
                var temp = value[key]['temperature'];
                if(temp){
                    temps.push(temp);
                }
            }
        }
    }

    if(temps.length > 0){
        var maxVal = Math.max.apply(null, temps);

        var pwm = calculatePWMForTemperature(Math.ceil(maxVal));

        setPiSensorServiceFanSpeed(client, pwm);

        this._lastRpm = calculateRpmForPWM(pwm);
        return pwm;
    }
};

function calculateRpmForPWM(pwm){
    if(pwm<50)
        pwm = 50;
    else if (pwm>100)
        pwm = 100;

    return 20*(pwm-20);
}

function calculatePWMForTemperature(temperature){
    if(temperature < 20)
        temperature = 20;
    else if(temperature > 45)
        temperature = 45;

    return 2*(temperature + 10);
}

function setPiSensorServiceFanSpeed(client, pwm){
    if(!client || !pwm)
        return;

    client.get(util.format('/set_pwm/?pwm=%s', pwm), function (err, req, res, obj) {
        if(err){
            console.log(err);
            return;
        }

        if(obj){
            if(!obj["success"]){
                if(obj["error"]){
                    console.log(obj["error"]);
                }
            }
        }
    });
}

module.exports = new FanControl();
