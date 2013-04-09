exports.index = function(req,res) {
  res.render('main/main',{ title:'Daibi.org'});
};
exports.movie = function (req,res) {
  res.render('movie/movie',{ title: 'movie daily'});
};
