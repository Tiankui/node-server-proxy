//必须添加否则影响fe与rd模式
exports.info = {
    path:__dirname
};
exports.routings = {
    //首页
    '/': {method: 'get', processFile:'/main'},
    //ajax获取首页文章列表
    '/articleList': {method: 'get',processFile: '/articleList'}
    //登录
   // '/login': {method: 'get', processFunction:  require('./login/routes').login}
};
