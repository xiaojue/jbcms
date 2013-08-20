var util = require('util');
var express = require('express');
var load = require('express-load');
var _dir = __dirname;
var jf = require('jsonfile');
var fs = require('fs');
var path = require('path');
var events = require('events');
var expressLiquid = require('express-liquid');
var help = require('utils/help');

function jbcms() {
  events.EventEmitter.call(this);
  this.app = express();
  this.loaders = [];
  this.config = {
    //default
    "sitename": "jbcms",
    "description": "jbcms custom site",
    "version": "0.0.1",
    "headers": [

    ],
    "skin": "default",
    "viewPath": "views",
    "assestPath": "public",
    "host": "localhost",
    "jspath": "http://localhost:8081/",
    "port": "8081",
    "db": {
      "mysql": {
        "host": "localhost",
        "password": "3011354",
        "username": "root",
        "database": "Jbcms"
      },
      "mongodb": {
        "url": "mongodb://127.0.0.1:27017/Jbcms",
        "database": "Jbcms"
      }
    },
    "mail": {

    }
  };
}

util.inherits(jbcms, events.EventEmitter);

jbcms.prototype = {
  constructor: jbcms,
  _setUp: function() {
    var cfg = this.config;
    this.app.set('config', cfg);
    this.app.set('views', _dir + '/' + cfg.viewPath);
    this.app.set('view engine', '.html');
    this.app.engine('.html', expressLiquid());
    this.app.use(express['static'](_dir + '/' + cfg.assestPath));
    this.app.use(express.bodyParser());
    this.app.use(express.methodOverride());
    this.app.use(express.cookieParser());
    this.app.use(express.cookieSession({
      secret: cfg.host,
      cookie: {
        path: '*'
      }
    }));
  },
  load: function(model) {
    this.loaders.push(model);
    return this;
  },
  _load: function() {
    var loaders = this.loaders,
    l;
    loaders.forEach(function(loader, i) {
      if (i === 0) l = load(loader);
      else l.then(loader);
    });
    if (l) l.into(this.app);
  },
  setConfig: function(path) {
    this.config = help.extendJsonFile(path, this.config);
    return this;
  },
  loadUserViews: function(skin) {
    this.app.set('skin', skin);
    return this;
  },
  init: function() {
    var config = this.config;
    this._setUp();
    this._load();
    this.app.listen(config.port);
    console.log("%s running on %s port", config.host, config.port);
  }
};

module.exports = jbcms;

