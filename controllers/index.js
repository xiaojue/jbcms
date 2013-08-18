module.exports = function(app) {
  var skin = app.locals.config.skin;
  return {
    index: function(req, res, next) {
      var artice = req.app.apis.artice;
      res.render(skin + '/index');
    },
    notFound:function(req,res){
      res.send('404 page',404);
    }
  };
};

