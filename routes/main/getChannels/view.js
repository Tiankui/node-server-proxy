module.exports = function (req, res) {
    //res.render('main/channel', { title: req.data.title });
    res.json(200, req.data);
};
