module.exports = function(req, res ){
  var data = require("../fe-data/main.js");
  //res.render('main/main', { title: req.data.title });
  res.render('main/main',req.data);
};
