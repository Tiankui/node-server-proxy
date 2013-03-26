var service = require('./service');
var view = require('./view');
module.exports = function () {
    //此处返回route的middleware，server为RD开发的业务逻辑，view为FE的模板内容渲染。依照数组顺序执行。
    return [service, view];
};
