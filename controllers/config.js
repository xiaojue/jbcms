module.exports = function(app) {
  var config = app.get('config');
  return {
    checkall: function(req, res, next) {
      //还需要增加管理权限校验，非admin账户禁止进入admin路径
      var isSetting = /^\/config\/setting$/.test(req.path);
      if (config.initSite || isSetting) {
        next();
      } else {
        res.redirect('config/setting');
      }
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

