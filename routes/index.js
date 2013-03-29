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
        if(routings[routing].processFile){//嵌套模块
            processFilePath = path.normalize(modulePath+routings[routing].processFile);
            pf = require(processFilePath)();
        }else{//一级模块
            processFilePath = path.normalize(modulePath);
            pf = routings[routing].processFunc;
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
                case 'FE':
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
        //根据method类别注册路由
        if (routings[routing].method == 'get') {
            app.get(routing, pfArray);
        } else if (routings[routing].method == 'post') {
            app.post(routing, pfArray);
        } else {
            app.all(routing, pfArray);
        }
    }
}
