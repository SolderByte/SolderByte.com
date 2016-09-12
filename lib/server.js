var async = require('async');
var config = require('./config');
var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');
var hbs = require('hbs');
var http = require('http');
var log = require('./logger');
var path = require('path');
var router = require('./router');

var server = module.exports = {};

server.init = function init(callback) {
  var self = this;

  // express app
  self.app = express();

  // handlebars
  hbs.registerHelper('raw-helper', function(options) {
    return options.fn();
  });
  hbs.registerHelper('isActive', function(page) {
    var result = '';
    if(page === this.page) {
      result = 'active';
    }
    return new hbs.SafeString(result);
  });
  hbs.registerPartials(path.join(__dirname, '../site/views/partials'));

  // view engine setup
  self.app.set('views', path.join(__dirname, '../site/views'));
  //app.set('view engine', 'hbs');
  self.app.set('view engine', 'html');
  self.app.engine('html', require('hbs').__express);

  self.app.use(favicon(path.join(__dirname, '../site/static/img/favicon.png')));
  self.app.use(express.static(path.join(__dirname, '../site/static')));

  // express router
  self.app.use('/', router);

  // error handlers
  self.app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    log.error({err: err}, 'Error');
    res.render('error', {
      message: err.message,
      error: err
    });
  });

  async.waterfall([
    function(callback) {
      // start server
      http.createServer(self.app).listen(config.httpPort, function() {
        log.info({port: config.httpPort}, 'HTTP server listening');
        callback(null);
      });
    }
  ], function(err) {
    if(callback) {
      callback(null);
    }
  });
};
