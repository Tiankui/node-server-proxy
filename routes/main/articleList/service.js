var Server = require('data-service');
var async = require('async');
module.exports = function (req, res, next) {
    async.parallel([
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=1'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        },
        function(callback){
            new Server({
                path: '/portal/index/loadNews.do?t=2'
            }).request().on('response', function (data) {
                callback(null,data);
            });
        }
    ], function(err,results){
        req.data = {dataArray:results[0]};
        console.log(require('util').inspect(req.data.dataArray[0],{depth:4}));
        next();
    });


};
