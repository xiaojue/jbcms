var jf = require('jsonfile');

exports.mix = function(target, source, covered) {
  var key;
  for (key in source) {
    if (!covered || ! (key in target)) {
      target[key] = source[key];
    }
  }
  return target;
};

exports.extendJsonFile = function(file,obj){
  var json = jf.readFileSync(file);
  return exports.mix(json,obj,true);
};

exports.coveredJsonFile = function(file,obj){
  jf.writeFileSync(file,exports.extendJsonFile(file,obj));
};
