module.exports = function(app) {
  var config = app.get('config');
  return {
    checkConfig: function(req, res, next) {
      var isSetting = /^\/admin\/setting$/.test(req.path);
      if (config.initSite || isSetting) {
        next();
      } else {
        res.redirect('admin/setting');
      }
    },
    checkAdmin: function(req, res, next) {
      var inAdmin = /^\/admin\/*/.test(req.path);
      if (inAdmin) {
        //非admin账户禁止进入admin路径
        //这里先不写直接放行
        next();
      } else {
        next();
      }
    },
    checkPost:function(req,res,next){
      next(); 
    },
    saveSetting:function(req,res,next){
      console.log(req.body);
      next();      
    }
  };
};

