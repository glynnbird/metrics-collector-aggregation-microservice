var selector = null;
var counter = {};


var push = function(obj, callback) {
  var v = obj[selector];
  if (typeof counter[v] == "undefined") {
    counter[v] = 1;
  } else {
    counter[v]++;
  }
  callback(null);
};

var query = function(callback) {
  callback(null, counter);
};

var initialise = function(s, callback) {
  selector = s;
  reset(callback);
};

var reset = function(callback) {
  counter = {};
  callback(null);
}

module.exports = {
  initialise: initialise,
  push: push,
  query: query,
  reset: reset
}