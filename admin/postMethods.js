exports.save = function(req, res, next) {
  var apis = this.apis.admin;
  var body = req.body;
  apis.initSetting({
    sitename: body.sitename
  },
  function(err, settings) {
    if (err) next(err);
    else next();
  });
};

