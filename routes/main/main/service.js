var Server = require('data-service')();
module.exports = function (req, res, next) {
    req.session.user = 'test';
    var server = new Server({
        path: '/portal/index/channel.do'
    });
    server.request();
    server.on('response', function (data) {
        req.data = data;
        next();
    });
};


