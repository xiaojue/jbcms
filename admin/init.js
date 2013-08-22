exports.onload = function() {
  var Setting = this.schema.define('Setting', {
    sitename: String,
    description: String,
    skin: String,
    host: String,
    logo: String,
    headers: Array
  });
  this.models.Setting = Setting;
  this.schema.automigrate();
};

