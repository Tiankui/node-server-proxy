module.exports = function (req, res, next) {
    if(req.session.currentUser){
        next();
    }else{
        //渲染登录页面
        res.render('/noLogin');
    }
}