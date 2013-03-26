/**
 * node与后台server通讯类
 * @type {*}
 */

var sysConfig = require('../config.js');
var events = require("events");
var http = require('http');
module.exports = function () {
    function DataServer(options) {
        this.host = sysConfig.SERVER.HOST;   //数据提供端地址
        this.port = sysConfig.SERVER.PORT;
        this.encode = 'utf8';
        this.reader = 'JSON';
        this.path = '';
        this.method = 'POST';
        this.reqParam = '';
        this.dataCarrier = null;
        this.server_emitter = new events.EventEmitter();
        merge(this, options);
    };
    DataServer.prototype.on = function (eventName, listener) {
        this.server_emitter.on(eventName, listener);
    };
    DataServer.prototype.request = function () {
        var serverReqOpts = {
            host: this.host,
            port: this.port,
            path: this.path,
            method: this.method
        };
        var self = this;
        var serverReq = http.request(serverReqOpts, function (serverRes) {

            console.log('STATUS: ' + serverRes.statusCode);
            console.log('HEADERS: ' + JSON.stringify(serverRes.headers));

            serverRes.setEncoding('utf8');
            self.dataCarrier = "";
            serverRes.on('data', function (chunk) {
                self.dataCarrier += chunk;
            });
            serverRes.on('end', function () {
                var data =  self.dataCarrier;
                /**
                 *  以后可提取出去作为解析对象使用
                 *  目前只支持JSON
                 */
                if(self.reader.toUpperCase()=='JSON'){
                    try{
                        data = JSON.parse(data);
                    }catch(e){
                        console.log(e);
                        data = self.dataCarrier;
                    }
                }
                self.server_emitter.emit('response', data);
            });

        });
        // write data to request body
        serverReq.write(this.reqParam);
        serverReq.end();

    }
    return DataServer;
}

var merge = function (a, b) {
    if (a && b) {
        for (var key in b) {
            a[key] = b[key];
        }
    }
    return a;
};