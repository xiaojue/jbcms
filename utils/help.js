exports.mix = function(target, source, covered) {
  var key;
  for (key in source) {
    if (!covered || ! (key in target)) {
      target[key] = source[key];
    }
  }
  return target;
};

