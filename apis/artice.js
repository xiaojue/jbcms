module.exports = function(app) {
  var db = app.get('db');
  var Artice = db.models.Artice;
  return new Artice;
};

