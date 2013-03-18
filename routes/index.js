var main_module = require('./main');
module.exports = function(app){
    getRoutes(app,main_module.routings);
};

var getRoutes = function(app,routings){
    //加载配置文件routing.js到变量routings. [/scripts/routing.js]
    for(var r in routings){
            //var pf = require(__dirname + routings[r].file)[routings[r].processFunction];
            var pf = routings[r].processFunction;
            if(routings[r].method == 'get')
                app.get(r, pf);
            else if(routings[r].method == 'post')
                app.post(r,pf);
            else
                app.all(r, pf);
    }
}