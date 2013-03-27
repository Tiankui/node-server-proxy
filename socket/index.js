var sysConfig = require('../config.js')
    , cookie = require('express/node_modules/cookie')
    , connect = require('express/node_modules/connect')
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
    global.socketIO = io.sockets;
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
        //对socket连接进行认证，是否为合法访问
        io.set('authorization', function (handshakeData, accept) {
            if (handshakeData.headers.cookie) {
                handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
                handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], sysConfig.SESSION_SECRET_KEY);
                if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
                    return accept('Cookie非法.', false);
                }
            } else {
                return accept('尚未取得过cookie', false);
            }
            accept(null, true);
        });
    });


    io.sockets.on('connection', function (socket) {
        console.log("Connection " + socket.id + " accepted.");
        var groupName = '';
        socket.on('register', function (data) {
            socket.join(data.groupName);
        });

        socket.on('userTalk', function (message) {
            console.log('userTalk :' + message.text);
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
