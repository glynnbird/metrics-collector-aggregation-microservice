var selector = null;
var total = 0;

var push = function(obj, callback) {
  if (selector && typeof obj[selector] == "number") {
    total += obj[selector]; 
     callback(null);
  } else {
    console.error("No data found for selector -",selector);
    callback("Invalid selector");
  }
};

var query = function(callback) {
  callback(null, total);
};

var initialise = function(s, callback) {
  selector = s;
  total = 0;
  callback(null);
};

var reset = function(callback) {
  total = 0;
  callback(null);
}

module.exports = {
  initialise: initialise,
  push: push,
  query: query,
  reset: reset
}
