
var selector = null;
var total = null;


var push = function(obj, callback) {
  if (selector) {
    var v = selector(obj);
    if (v) {
      total.sum += v;
      total.count++;
      total.min = Math.min(total.min, v);
      total.max = Math.max(total.max, v);
      total.sumsqr = v * v;
    }
    callback(null);
  } else {
    console.error("No data found for selector -", selector);
    callback("Invalid selector");
  }
};

var query = function(callback) {
  callback(null, total);
};

var initialise = function(s, callback) {
  selector = null;
  try {
    selector = eval("(" + s + ")");
  } catch (e) {    
  }
  if (typeof selector == 'function') {
    reset(callback);
  } else {
    callback("Selector is not a function", null);
  }
};

var reset = function(callback) {
  total = {
    sum: 0,
    count: 0,
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
    sumsqr: 0
  };
  callback(null);
}

module.exports = {
  initialise: initialise,
  push: push,
  query: query,
  reset: reset
}