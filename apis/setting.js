var help = require('../utils/help');
module.exports = function(app) {
  var db = app.get('db');
  var Setting = db.models.Setting;
  help.mix(Setting.prototype,{
     
  });
  return new Setting;
};
