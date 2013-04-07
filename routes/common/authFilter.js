module.exports = function (req, res, next) {
    if(req.session.currentUser){
        //需判断是否具有权限，日后补全
        if(true){
            next();
        }else{
            res.render('/noAtuhrity');
        }
    }else{
        //渲染登录页面
        res.render('/noLogin');
    }
}