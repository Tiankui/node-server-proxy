module.exports = function(req, res ){
		res.render('index', { title: req.data.title });
};
