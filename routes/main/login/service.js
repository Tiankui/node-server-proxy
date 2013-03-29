var CAS = require('cas');
var cas = new CAS({
    base_url: 'https://itebeta.baidu.com/',
    service: 'http://localhost:3000/',
    version: 2.0
});
module.exports = function (req, res, next) {
    cas.authenticate(req, res, function (err, status, username, extended) {
        var data = {};
        if (err) {
            data = {success:false,msg:err};
        } else {
            req.session.loginUser = username;
            var socketIO = global.socketIO;
            socketIO.on('connection',function(socket){
                socket.join(username);
            });
            socketIO.in('testGroup').emit('userLogin',{username:username});
            data = {success:true,data:{username:username,status:status}};
        }
        req.data = data;
        next();
    });
};

