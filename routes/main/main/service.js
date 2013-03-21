var Server = require('../../server')();
module.exports =function(req, res ,next){
    var requestIp = req.ip;
    var dataCarrier = {};
    var server = new Server({
        path:'/portal/index/channel.do'
    });
    server.on('response',function(data){
        req.data = data;
        next();
    }) ;
    var callback

    server.request();
};


