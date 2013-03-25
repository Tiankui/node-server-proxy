var os = require('os')
    , config = require('../config')
    , redis = require('socket.io/node_modules/redis')
    , pub = redis.createClient(config.REDIS.PORT, config.REDIS.HOST)
    , sub = redis.createClient(config.REDIS.PORT, config.REDIS.HOST)
    , store = redis.createClient(config.REDIS.PORT, config.REDIS.HOST);
/*pub.auth('passwd', function(){console.log("pub登录成功")});
sub.auth('passwd', function(){console.log("sub登录成功")});
store.auth('passwd', function(){console.log("store登录成功")});*/

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.configure(function () {
        io.enable('browser client minification');  // send minified client
        io.enable('browser client etag');          // apply etag caching logic based on version number
        io.enable('browser client gzip');          // gzip the file
        io.set('log level', 1);                    // reduce logging
        io.set('transports', [                     // enable all transports (optional if you want flashsocket)
            'websocket'
            , 'htmlfile'
            , 'xhr-polling'
            , 'jsonp-polling'
        ]);
        var RedisStore = require('socket.io/lib/stores/redis');
        io.set('store', new RedisStore({redisPub: pub, redisSub: sub, redisClient: store}));
    });


    io.sockets.on('connection', function (socket) {
        console.log("Connection " + socket.id + " accepted.");
        var groupName = '';
        /*var sysinfoInterval = setInterval(function () {
            var sysinfo = {'hostname': os.hostname(),
                'systemtype': os.type(),
                'release': os.release(),
                'uptime': os.uptime(),
                'loadavg': os.loadavg(),
                'totalmem': os.totalmem(),
                'freemem': os.freemem(),
                'cpus': os.cpus(),
                'disk': ''
            };
            io.sockets.emit('sysinfo', sysinfo);
        }, 10000);*/
        socket.on("userLogin", function(data, fn){
            fn({msg : "Hello " + data.userName});
            socket.join(data.groupName);
            groupName = data.groupName;
            io.sockets.in(groupName).emit('userTalk',{ msg: "傻逼连接了->: " + data.userName, data : data });
        });


        socket.on('userTalk',function(message){
            console.log('userTalk :'+message.text);
            //socket.emit('otherUserTalk',{text:message.text});
            io.sockets.in(groupName).emit('userTalk', message);
        });
        socket.on('message', function (message) {
            console.log("Received message: " + message + " - from client " + socket.id);

        });
        socket.on('disconnect', function () {
//            clearInterval(sysinfoInterval);
            console.log("Connection " + socket.id + " terminated.");
        });
    });

};
