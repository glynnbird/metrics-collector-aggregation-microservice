var selector = null;


var push = function(obj, callback) {
  callback(null);
};

var query = function(callback) {
  callback(null, null);
};

var initialise = function(s, callback) {
  selector = s;
  callback(null);
};

var reset = function(callback) {
  callback(null);
}

module.exports = {
  initialise: initialise,
  push: push,
  query: query,
  reset: reset
}