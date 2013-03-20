/**
 * Module dependencies.
 */

var express = require('express'),
    RedisStore = require('connect-redis')(express),
    sysConfig = require('./config.js'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    cluster = require('./cluster');

var app = express();

app.configure(function () {
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: sysConfig.SESSION_SECRET_KEY,
        store: new RedisStore(sysConfig.REDIS)
    }));
    app.use(app.router);
    //  app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use('/lib', express.static(__dirname + '/app/lib'));
    app.use('/static', express.static(__dirname + '/app/dist'));
    app.use('/static', express.static(__dirname + '/app/img'));
    app.use('/test', express.static(__dirname + '/codeLab'));
});

app.set('env', 'development');
app.configure('development', function () {
    console.log('development mode');
});
app.configure('production', function () {
    console.log('production mode');
});
//将app放入全局变量中
global.appContext  = app;
//加载路由
routes(app);

//cluster(function () {
    /**
     http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    });*/
    var server = http.createServer(app);

//socket与文件上传转发服务注册 可考虑合并
    var socketService = require('./socket')(server);
    var fileUploadProxy = require('./routes/fileUploadProxy')(server);

    server.listen(sysConfig.LISTEN_PORT, function () {
        console.log("Express server listening on port " + sysConfig.LISTEN_PORT);
    });
//});
