var path = require('path');
var main_module = require('./main');
module.exports = function (app) {
    getRoutes(app, main_module);
};

var getRoutes = function (app, mod) {
    var routings = mod.routings;
    var moduleInfo = mod.info;
    //加载配置文件routing.js到变量routings. [/scripts/routing.js]
    for (var routing in routings) {
        //var pf = require(__dirname + routings[r].file)[routings[r].processFunction];
        var pf = require(path.normalize(moduleInfo.path+routings[routing].processFile))();
        var pfArray = [];
        if(!Array.isArray(pf)){
            pfArray.push(pf);
        }else{
            switch(app.get('env')){
                case 'FE':
                    var feTestService = require('../testRoutes/FeTestService')(path.normalize(moduleInfo.path + routings[routing].processFile));
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

        if (routings[routing].method == 'get') {
            app.get(routing, pfArray);
        } else if (routings[routing].method == 'post') {
            app.post(routing, pfArray);
        } else {
            app.all(routing, pfArray);
        }
    }
};
