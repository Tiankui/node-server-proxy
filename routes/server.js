var sysConfig = require('../config.js');
var http = require('http');
module.exports = function(){
   function Server(options){
       this.host = sysConfig.SERVER.HOST;
       this.port = sysConfig.SERVER.PORT;
       this.encode = 'utf8';
       this.path = '';
       this.method = 'POST';
       this.reqParam = '';
       this.dataCarrier = null;
       this.reqCallback = null;
       merge(this,options);
   };

   Server.prototype.request = function(){
       var serverReqOpts = {
           host : this.host,
           port : this.port,
           path:  this.path,
           method : this.method
       };
       var self = this;
       var serverReq = http.request(serverReqOpts, function(serverRes) {

           console.log('STATUS: ' + serverRes.statusCode);
           console.log('HEADERS: ' + JSON.stringify(serverRes.headers));

           serverRes.setEncoding('utf8');
           self.dataCarrier = "";
           serverRes.on('data', function(chunk) {
               self.dataCarrier +=chunk;
           });
           serverRes.on('end',self.reqCallback);

       });
       // write data to request body
       serverReq.write(this.reqParam);
       serverReq.end();

   }
    return Server;
}

var merge = function(a, b){
    if (a && b) {
        for (var key in b) {
            a[key] = b[key];
        }
    }
    return a;
};