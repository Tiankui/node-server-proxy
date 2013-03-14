module.exports =function(req, res ,next){
		req.data =  {title:'我去年买了个表='};
		next();
};