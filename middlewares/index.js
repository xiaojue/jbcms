var fs = require('fs');
var Path = require('path');
var liquid = require('express-liquid');

function overviewMethod(controller, methods) {
  var method = methods.shift();
  if (controller.hasOwnProperty(method)) {
    if (methods.length) return overviewMethod(controller[method], methods);
    else {
      var handle = controller[method];
      return typeof handle == 'function' ? handle: false;
    }
  } else {
    return false;
  }
}

module.exports = function(app) {
  var config = app.get('config');
  return {
    index: function(req, res, next) {
      var query = req.query;
      var view = Path.normalize(req.path).replace(/^\/|\/$/g, '');
      var realfile = Path.join(app.settings.views, view + app.settings['view engine']);
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
    post: function(req, res, next) {
      var postPath = Path.normalize(req.path).replace(/^\/|\/$/g, '');
      var methods = postPath.split('/');
      var postMethod = overviewMethod(app.controllers, methods);
      if (postMethod !== false) {
        postMethod(req, res, next);
      } else {
        next();
      }
    },
    notFound: function(req, res) {
      res.send('404 page', 404);
    }
  };
};

