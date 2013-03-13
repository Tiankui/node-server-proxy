module.exports = function(req, res ,next ,option){
		res.render('index', { title: req.data.title });
};