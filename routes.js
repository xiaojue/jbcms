module.exports = function(app) {
  var index = app.controllers.index;
  var config = app.controllers.config;

  app.get('*',config.checkConfig,config.checkAdmin,index.index,index.notFound);
  app.post('*',config.checkPost,index.post,index.notFound);
};

