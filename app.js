/**
 * Module dependencies.
 */

var express = require('express'),
    RedisStore = require('connect-redis')(express),
    sysConfig = require('./config.js'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    resVerify = require('./routes/common/resVerify'),
    log4js = require('log4js'),
    cluster = require('./cluster');

//日志配置
log4js.configure({
    appenders:[{
        type:'dateFile',
        pattern: "-yyyy-MM-dd",
        filename:'./logs/business.log',
        category:['business']
    },{
        type:'console'
    },{
        type:'dateFile',
        pattern: "-yyyy-MM-dd",
        filename:'./logs/server.log',
        category:['sys','routing','console']
    }],
    replaceConsole:true
});

var logger = log4js.getLogger('routing');
logger.setLevel('INFO');

//add ejs filters
require('./ejsFiltersAddon')(require('ejs').filters);

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');
  app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    key: 'express.sid',
    secret: sysConfig.SESSION_SECRET_KEY,
    store: new RedisStore({port:sysConfig.REDIS.PORT,host:sysConfig.REDIS.HOST})
  }));
  app.use(app.router);
  app.use(resVerify);
  app.use('/lib', express['static'](__dirname + '/app/lib'));
  app.use('/static', express['static'](__dirname + '/app/dist'));
  app.use('/static/img', express['static'](__dirname + '/app/img'));
});


var mode = process.argv[2]?process.argv[2]:sysConfig.MODE;
switch (mode) {
  case 'dev':
    app.set('env', 'development');
  break;
  case 'pro':
    app.set('env', 'production');
  break;
  case 'fe':
    app.set('env', 'FE');
  break;
  case 'rd':
    app.set('env', 'RD');
  break;
  default:
    app.set('env', 'development');
}

app.configure('development', function () {
  console.log('development mode');
});

app.configure('production', function () {
  console.log('production mode');
});

//将app放入全局变量中
global.appContext = app;
//加载路由
routes(app);

/**
  http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  });*/

function startServer(app) {
  var server = http.createServer(app);
  //socket与文件上传转发服务注册 可考虑合并
  if (app.get('env') !== 'FE') {
    var socketService = require('./socket')(server);
  }
  var fileUploadProxy = require('./routes/fileUploadProxy')(server);
  server.listen(sysConfig.LISTEN_PORT, function () {
    console.log("服务启动，监听端口：" + sysConfig.LISTEN_PORT);
  });
}


if (app.get('env') === 'production') {
  cluster(function () {
    startServer(app);
  });
} else {
  startServer(app);
}
