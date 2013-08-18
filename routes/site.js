module.exports = function(app) {
  var index = app.controllers.index;
  var config = app.controllers.config;

  app.all('*',config.checkConfig);
  app.all('/admin/*',config.adminCheckAdmin);

  app.get('/config/setting',config.setting);
  app.get('/',index.index);
  app.get('*',index.notFound);
};

