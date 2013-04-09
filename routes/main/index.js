//必须添加否则影响fe与rd模式
exports.info = {
    path:__dirname
};
/*注册该模块下所有的路由
* key：路由路径
* method：请求方式 POST|GET
* processFile:指定处理模块的controller
*
* */
exports.routings = {
    //首页
    '/': {method: 'get', processFile:'/main',needLogin:true,needAuth:true},
    //登录
    '/login': {method: 'get', processFile:'/login'}
};
