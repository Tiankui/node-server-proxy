var login_routes = require('./login/routes');
var getdata_routes = require('./getdata/routes');
exports.routings = {
    //首页
    '/':{method:'get',processFunction:require('./main')()},
    //登录
    '/login':{method:'get',processFunction:login_routes.login},
    //获取数据
    '/getdata':{method:'get',processFunction:getdata_routes.getData},
    //整合
    '/getchannel':{method:'get',processFunction:require('./getChannels')()}
};
