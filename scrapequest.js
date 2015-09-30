var request = require('request');
var dirty = require('dirty');
var path = require('path');
var cheerio = require('cheerio');
var debug = require('debug')('scrapequest');

var dbpath = path.join('scrapequest.db'); // could put it under __dirname?
var db = dirty(dbpath);
var queue = [];
module.exports.interval = 1000;
module.exports.requestOptions = {
  headers: {}
};

// i love state. state state state.  put it in my app.  app app app.
var running = false;
var loaded = false;

db.on('load', function() {
  loaded = true;
  run();
});

// pops an item from the queue if there is one
function run() {
  running = true;
  if (queue.length == 0) {
    debug('queue flushed');
    running = false;
    return;
  }

  var req = queue.splice(0, 1)[0];
  var cached = db.get(req.url);

  if (cached && typeof cached.err === 'undefined' && typeof cached.body !== 'undefined') {
    debug(req.url + ' found in cache');
    var $ = cheerio.load(cached.body);
    req.callback(null, $);
    debug('callback called, running next item immediately because no web request was made');
    setImmediate(function() {
      run();
    })
  } else {
    debug(req.url + ' not found in cache, requesting...');
    module.exports.requestOptions.url = req.url;
    debug('request options: ' + JSON.stringify(module.exports.requestOptions, null, 2));
    request(module.exports.requestOptions, function(e, r, b) {
      if (e) {
        debug('error requesting url ' + req.url);
        debug(e);
        db.set(req.url, {err: e, body: b});
        req.callback(e);
        return;
      }

      db.set(req.url, {body: b});
      var $ = cheerio.load(b);
      req.callback(null, $);
      debug('callback called, running next item with timeout interval ' + module.exports.interval);
      setTimeout(function() {
        run();
      }, module.exports.interval);
    });
  }
}

module.exports.scrape = function(url, callback) {
  if (typeof callback !== 'function') {
    callback = function(e, r) {
      if (typeof e !== 'undefined') {
        console.error(e);
      }
    }
  }
  if (typeof url === 'undefined') {
    return callback('Cannot queue undefined url');
  }
  debug('queueing ' + url);
  queue.push({url: url, callback: callback});
  if (!running && loaded) {
    run();
  }
}
