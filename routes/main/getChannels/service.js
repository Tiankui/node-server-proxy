var Server = require('../../dataServer')();
module.exports = function (req, res, next) {
    var requestIp = req.ip;
    var dataCarrier = {};
    var server = new Server({
        path: '/portal/index/channel.do',
        dataCarrier: dataCarrier,
        reqCallback: function () {
            req.data = JSON.parse(server.dataCarrier);
            next();
        }
    });
    server.request();
};