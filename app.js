var fs = require('fs');
var cfenv = require('cfenv');
var queue_types = fs.readdirSync("./plugins/hub/").map(function(v) { return v.replace(".js","")});
var queue_type = "null";
var writer = require('./lib/writer.js');
if (queue_types.indexOf(process.env.QUEUE_TYPE) > -1) {
  queue_type = process.env.QUEUE_TYPE;
}
console.log("Queue mode:", queue_type);
var q = require('./plugins/hub/' + queue_type);

q.collect();

var express = require('express');
var app = express();

app.get('/configure', function (req, res) {
  if (req.query.mode) {
    writer.setMode(req.query.mode, req.query.selector, function(err, data) {
      if (err) {
        return res.status(404).send({ok: false, error: err});
      }
      res.send({ok: true, mode: req.query.mode, selector: req.query.selector});
    });
  } else {
    return res.status(404).send({ok: false, error: "Missing parameter 'mode'"}); 
  }
});

app.get('/reset', function(req, res) {
  writer.reset(function() {
    res.send({ok: true});
  })
});

app.get('/query', function(req, res) {
  writer.query(function(err, data) {
    res.send({ok: true, err:err, data:data});
  })
});

var appEnv = cfenv.getAppEnv();
console.log("App starting on",appEnv.url);
app.listen(appEnv.port);

//require("cf-deployment-tracker-client").track();

