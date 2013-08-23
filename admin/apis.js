module.exports = function() {
  return {
    initSetting: function(settings, callback) {
      var Setting = this.models.Setting;
      Setting.create(settings, callback);
    },
    set: function(key, val, callback) {
      var Setting = this.models.Setting;
      Setting[key] = val;
      Setting.save(callback);
    },
    get: function(id,callback) {
      var Setting = this.models.Setting;
      Setting.find(id, callback);
    }
  };
};

