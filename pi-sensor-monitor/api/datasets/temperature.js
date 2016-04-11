/**
 * Created by barte_000 on 2016-04-12.
 */
module.exports = function (req, res){
    console.log(req.params.period);
    res.send({hey: req.params.period});
};