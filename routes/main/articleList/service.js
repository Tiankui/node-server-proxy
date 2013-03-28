var Server = require('../../dataServer')();
var async = require('async');
module.exports = function (req, res, next) {

    async.parallel([
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=1'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            var server = new Server({
                path: '/portal/index/loadNews.do?t=2'
            });
            server.request();
            server.on('response', function (data) {
                callback(null,data);
            });
        }
    ], function(err,results){
        req.data = {dataArray:results};
        console.log(results);

        next();
    });


};


