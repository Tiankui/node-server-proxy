var Server = require('../../dataServer')();
module.exports = function (req, res, next) {
    var server = new Server({
        path: '/portal/index/channel.do'
    });
    server.request();
    server.on('response', function (data) {
        req.data = data;
        next();
    });
};


