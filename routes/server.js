var sysConfig = require('../config.js');
exports.request = function(){

    var serverReqOpts = {
        host : serverConfig.SERVER.HOST,
        port :  serverConfig.SERVER.PORT,
        path:'/portal/index/channel.do',
        method : 'POST'
    };

    var serverReq = http.request(serverReqOpts, function(serverRes) {
        console.log('STATUS: ' + serverRes.statusCode);
        console.log('HEADERS: ' + JSON.stringify(serverRes.headers));
        serverRes.setEncoding('utf8');
        var serverResData = "";
        serverRes.on('data', function(chunk) {
            serverResData +=chunk;

        });
        serverRes.on('end',function(chunk){
            req.data =  serverResData;
            next();
        });

    });
    // write data to request body
    serverReq.write('{userName:"'+req.session.loginUser+'",requestIp:""}');
    serverReq.end();
}