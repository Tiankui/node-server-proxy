var Server = require('data-service');
var async = require('async');
var redis = require('redis-service');
module.exports = function (req, res, next) {
    var redis_client = redis.createClent();

    for(var i=0;i<5000;i++){
        if(i%2==0){
            redis_client.sadd("fatricleReaderList", "user"+i);
        }
    }
    for(var i=0;i<200;i++){
        redis_client.sadd("userFriendsList","user"+i);
    }
    var sdate = new Date();
    redis_client.send_command('sinter',['fatricleReaderList','userFriendsList'],function(err,data){
        var edate = new Date();
        var time = edate.getTime()-sdate.getTime();
        console.log(time);
        console.log(data.length);
        req.data = {time:time};
        next();
    });



};
