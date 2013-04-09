/**
 * Module dependencies.
 */

var express = require('express'),
    sysConfig = require('./config.js'),
    RedisStore = require('connect-redis')(express),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    log4js = require('log4js'),
    logger = log4js.getLogger('routing'),
    cluster = require('./cluster'),
    app = express();


//add ejs filters
require('./ejsFiltersAddon')(require('ejs').filters);

//Log config
require('./logConfig')(log4js);
logger.setLevel('INFO');

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
  app.use('/lib', express['static'](__dirname + '/app/lib'));
  app.use('/static', express['static'](__dirname + '/app/dist'));
  app.use('/static/img', express['static'](__dirname + '/app/img'));
});


app.set('env',process.argv[2]?process.argv[2]:sysConfig.MODE)

//将app放入全局变量中
global.appContext = app;
//加载路由
routes(app);

function startServer(app) {
    app.listen(sysConfig.LISTEN_PORT, function () {
    console.log("服务启动，监听端口：" + sysConfig.LISTEN_PORT);
  });
}

if (app.get('env') === 'pro') {
  console.log('production mode');
  cluster(function () {
    startServer(app);
  });
  
} else {
  console.log('development mode');
  startServer(app);
}