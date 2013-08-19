module.exports = function(app) {
  var config = app.get('config');
  return {
    checkConfig: function(req, res, next) {
      var isSetting = /^\/config\/setting$/.test(req.path);
      if (config.initSite || isSetting) {
        next();
      } else {
        res.redirect('config/setting');
      }
    },
    adminCheckAdmin: function(req, res, next) {
      //非admin账户禁止进入admin路径
    },
    setting: function(req, res, next) {
      if (!config.initSite) {
        res.render('admin/setting');
      } else {
        next();
      }
    }
  };
};

