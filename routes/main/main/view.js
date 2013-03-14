module.exports = function(req, res ){
  res.render('main/main', { title: req.data.title });
};
