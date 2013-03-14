var service = require('./service');
var view = require('./view');
//route
exports.index = function(){
	return [service,view];
};
