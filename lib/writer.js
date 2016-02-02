var fs = require('fs');
var path = require('path');
var p = path.join(__dirname,"../plugins/aggregators");
var aggregator_types = fs.readdirSync(p).map(function(v) { return v.replace(".js","")});
var aggregator_type = "null";
var aggregator = null;

var push = function(obj, callback) {
  if (aggregator != null) {
    aggregator.push(obj, callback);
  } else {
    callback();
  }
};

var setMode = function(mode, selector, callback) {
  if (aggregator_types.indexOf(mode) > -1) {
    aggregator_type = mode;
    aggregator = require("../plugins/aggregators/" + mode + ".js");
    selector = (selector)?selector:null;
    aggregator.initialise(selector, callback);
    console.log("Aggregator type:", mode);
  } else {
    callback("Unknown aggregator", null);
  }
};

var reset = function(callback) {
  aggregator.reset(callback);
};

var query = function(callback) {
  aggregator.query(callback);
};


setMode(aggregator_type, null, function() { });

module.exports = {
  push: push,
  setMode: setMode,
  reset: reset,
  query: query
};