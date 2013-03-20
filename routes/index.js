var main_module = require('./main');
module.exports = function (app) {
    getRoutes(app, main_module.routings);
};

var getRoutes = function (app, routings) {
    //加载配置文件routing.js到变量routings. [/scripts/routing.js]
    for (var routing in routings) {
        //var pf = require(__dirname + routings[r].file)[routings[r].processFunction];
        var pf = routings[routing].processFunction;
        if (routings[routing].method == 'get') {
            app.get(routing, pf);
        }else if (routings[routing].method == 'post') {
            app.post(routing, pf);
        } else {
            app.all(routing, pf);
        }
    }
}