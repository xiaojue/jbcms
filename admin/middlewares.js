module.exports = function(loaders) {
  return {
    checkSetting: function(req, res, next) {
      if (req.method == 'GET') {
        var config = req.app.locals.settings.config;
        var isSetting = /^\/admin\/index$/.test(req.path);
        if (config.initSite || isSetting) {
          next();
        } else {
          res.redirect('admin/index');
        }
      } else {
        next();
      }
    }
  };
};

