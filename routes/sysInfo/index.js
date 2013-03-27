var service = require('./service');
var view = require('./view');
exports.info = {
    path:__dirname
};
exports.routings = {
    //首页
    '/sysInfo': {method: 'get', processFunc:[service, view]}
};