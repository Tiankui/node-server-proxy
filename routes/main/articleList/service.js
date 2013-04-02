var Server = require('data-service');
var async = require('async');
var redis = require('redis-service');
module.exports = function (req, res, next) {
    var redis_client = redis.createClent();
    redis_client.set("stringkey", "string val", function(err, reply){
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Reply: " + reply);
        }
    });
    redis_client.hset("hashkey", "hashtest 1", "some value", function(err, reply){
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Reply: " + reply);
        }
    });
    redis_client.hset(["hashkey", "hashtest 2", "some other value"], function(err, reply){
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Reply: " + reply);
        }
    });
    redis_client.hset("hashkey1", "hashtest", "some value", function(err, reply){
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Reply: " + reply);
        }
    });
    redis_client.hset(["hashkey1", "hashtest", "some other value"], function(err, reply){
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Reply: " + reply);
        }
    });
    redis_client.send_command('sinter',['hkey1','hkey2'],function(err,data){
        console.log(err);
        data.forEach(function (reply, i){
            console.log(reply);
        });
    });

    redis_client.hkeys("hashkey", function (err, replies) {
        if (err) {
            return console.error("error response - " + err);
        }

        console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
            console.log("    " + i + ": " + reply);
        });
    });

    redis_client.quit(function (err, res) {
        console.log("Exiting from quit command.");
    });
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
