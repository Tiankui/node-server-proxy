var http = require('http');
module.exports =function(req, res ,next){
    var requestIp = req.ip;

    req.data =  {title:'我去年买了个表='};

};