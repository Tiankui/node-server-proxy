/**
 * Module dependencies.
 */

var express = require('express'),
routes = require('./routes'), 
cluster = require('./lib/cluster'),
app = express();

//add ejs filters
require('./lib/ejsFiltersAddon')(require('ejs').filters);

// config
app.set('view engine', 'ejs');
app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(app.router);
app.set('views', __dirname + '/app/views');
app.use(express.favicon(__dirname + '/app/img/favicon.png'));
app.use('/lib', express['static'](__dirname + '/app/lib'));
app.use('/static', express['static'](__dirname + '/app/dist'));
app.use('/static/img', express['static'](__dirname + '/app/img'));

//routes
app.get('/',routes.index);
app.get('/movie',routes.movie);

cluster(function () {
  app.listen(3000, function () {
    console.log("服务启动，监听端口：" + 3000);
  });
});
