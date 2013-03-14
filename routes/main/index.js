var login_routes = require('./login/routes');
var getdata_routes = require('./getdata/routes');
module.exports = function(app){
	app.get('/', require('./main')());
	app.get('/login', login_routes.login);
	app.get('/getdata', getdata_routes.getData);
};
