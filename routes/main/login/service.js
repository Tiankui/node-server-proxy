var CAS = require('cas');
var logger = require('log4js').getLogger('business');
var cas = new CAS({
    base_url: 'https://itebeta.baidu.com/',
    service: 'http://localhost:3000/',
    version: 2.0
});
module.exports = function (req, res, next) {
    cas.authenticate(req, res, function (err, status, username, extended) {
        logger.info('用户：'+username+' 登录成功！');
        var data = {};
        if (err) {
            logger.error('登录失败！');
            data = {success:false,msg:err};
        } else {
            req.session.loginUser = username;
            data = {success:true,data:{username:username,status:status}};
        }
        req.data = data;
        next();
    });
};

