var selector = null;
var counter = 0;


var push = function(obj, callback) {
  counter++;
  callback(null);
};

var query = function(callback) {
  callback(null, counter);
};

var initialise = function(s, callback) {
  selector = s;
  counter = 0;
  callback(null);
};

var reset = function(callback) {
  counter = 0;
  callback(null);
}

module.exports = {
  initialise: initialise,
  push: push,
  query: query,
  reset: reset
}