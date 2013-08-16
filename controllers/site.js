exports.index = function(req, res, next) {
	var artice = req.app.apis.artice;
	res.send('jbcms index');
};

