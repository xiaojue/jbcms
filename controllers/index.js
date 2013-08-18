module.exports = function(app) {
	var skin = app.get('skin');
	return {
		index: function(req, res, next) {
			var artice = req.app.apis.artice;
			res.render(skin + '/index');
		}
	};
};

