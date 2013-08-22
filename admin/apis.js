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
    get: function(id, key, callback) {
      var Setting = this.models.Setting;
      Setting.find(id, function(err, ret) {
        if (err || ! ret) callback(err || '没有查询到信息');
        else callback(null, ret[key]);
      });
    }
  };
};

