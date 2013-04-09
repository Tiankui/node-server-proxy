var path = require('path');
module.exports = function (app) {
    getRoutes(app,require('./main'));
    getRoutes(app,require('./sysInfo'));
};

/*
 * 路由处理方法
 * @param app express上下文
 * @param mod 模块对象
 */

function getRoutes (app, mod) {
    var routings = mod.routings;
    var moduleInfo = mod.info;
    var modulePath = '';
    if(moduleInfo){
        modulePath = moduleInfo.path;
    }
    //加载模块的路由配置
    for (var routing in routings) {
        //处理方法的数组
        var pf = null;
        var processFilePath = modulePath;
        var currentRouting = routings[routing];
        if(currentRouting.processFile){//嵌套模块
            processFilePath = path.normalize(modulePath+currentRouting.processFile);
            pf = require(processFilePath)();
        }else{//一级模块
            processFilePath = path.normalize(modulePath);
            pf = currentRouting.processFunc;
        }
        if(!pf){
            console.log(routing+'加载失败，请查看路由配置');
            continue;
        }

        var pfArray = [];
        if(!Array.isArray(pf)){
            pfArray.push(pf);
        }else{
            //判断开发模式加载不同处理层
            switch(app.get('env')){
                case 'dev':
                    var feTestService = require('../testRoutes/FeTestService')(processFilePath);
                    pfArray.push(feTestService,pf[pf.length-1]);
                    break;
                case 'RD':
                    var rdTestView = require('../testRoutes/RdTestView');
                    pfArray = pf;
                    pfArray.pop();
                    pfArray.push(rdTestView);
                    break;
                default:
                    pfArray = pf;
            }
        }

        //判断盖模块是否需要授权才能访问
        if(currentRouting.needAuth){
            //增加权限校验中间件
            pfArray = pfArray.concat(require('./common/authFilter'),pfArray);
        }

        //判断盖模块是否需要授权才能访问
        if(currentRouting.needLogin){
            //增加权限校验中间件
            pfArray = pfArray.concat(require('./common/loginFilter'),pfArray);
        }

        //根据method类别注册路由
        if (currentRouting.method == 'get') {
            app.get(routing, pfArray);
        } else if (currentRouting.method == 'post') {
            app.post(routing, pfArray);
        } else {
            app.all(routing, pfArray);
        }
    }
}
