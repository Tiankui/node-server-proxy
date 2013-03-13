/**
 * Copyright(c) 2013 BJ Tiankui <eric.prototype@gmail.com>
 * 自定义配置
 * 如需要停掉server,就把dev里面的server注释掉
 */

module.exports = require('bai').config.extend('application', {
  appTasks:{
    common: [/*"coffee",*/"less","configure","concat:js","images:dev"],
    dev: [/*"server",*/"watch"],
    dist: ["uglify","cssmin"]
  }
});
