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

exports.coveredJsonFile = function(file,obj){
  var json = jf.readFileSync(file);
  var newjson = exports.mix(json,obj,true);
  jf.writeFileSync(file,newjson);
};
