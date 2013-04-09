var fs = require('fs');
var path = require('path');
module.exports = function(modulePath){
    try{
        var dataFile =  fs.readFileSync(path.join(modulePath,'data.json'),'utf8');
        return function (req, res, next) {
            req.data = JSON.parse(dataFile);
            next();
        };
    }catch(e){
        return function (req, res, next) {
            next();
        };
    }
};
