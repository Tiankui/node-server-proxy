var Server = require('data-service');

module.exports = function (req, res, next) {
    req.session.user = 'test';
    new Server({
        path: '/portal/index/channel.do',
        reqParam:{
            params:'test',
            params1:'test1'
        }
    }).request().on('response', function (data) {
        //logger.info(JSON.stringify(data));
        req.data = data;
        next();
    });
};


