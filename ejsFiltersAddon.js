module.exports = function (exports) {
  exports.truncate_ = function (str, len) {
    str = String(str);
    return str.substr(0,len) + '...';
  }; 
};
