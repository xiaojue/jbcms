module.exports = function(loaders) {
  return {
    set: function(key, val, callback) {
      callback(null, null);
    },
    get: function(id, key, callback) {
      var Setting = new loaders.admin.models.Setting;
      Setting.find(id, function(err, ret) {
        if (err) callback(err);
        else callback(null, ret[key]);
      });
    },
    settingLists: function() {

    }
  };
};

