var fs = require('fs');
var Path = require('path');
var liquid = require('express-liquid');
module.exports = function(app) {
	var config = app.get('config');
	return {
		index: function(req, res, next) {
			var query = req.query;
			var path = req.path;
			var view = Path.normalize(path).replace(/^\/|\/$/g, '');
			var realfile = Path.resolve(app.settings.views, view + app.settings['view engine']);
			if (fs.existsSync(realfile)) {
				var context = new liquid.tinyliquid.Context();
				context.setLocals('config', config);
				context.setLocals('query', query);
				res.render(view, {
					context: context
				});
			} else {
				next();
			}
		},
		notFound: function(req, res) {
			res.send('404 page', 404);
		}
	};
};

