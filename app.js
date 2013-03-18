
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "thisissecret" }));
  app.use(app.router);
//  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use('/lib',express.static(__dirname + '/app/lib'));
  app.use('/static',express.static(__dirname + '/app/dist'));
  app.use('/static',express.static(__dirname + '/app/img'));
  app.use('/test',express.static(__dirname + '/codeLab'));
});

app.set('env','development');
app.configure('development', function(){
	console.log('development mode');
});
app.configure('production', function(){
	 console.log('production mode');
});

//加载路由
routes(app);

/**
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});*/
var server = http.createServer(app);
var  socketService = require('./socket')(server);
server.listen(3000,function(){
  console.log("Express server listening on port " + app.get('port'));
});