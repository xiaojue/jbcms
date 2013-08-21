var util = require('util');
var Schema = require('jugglingdb').Schema;
var express = require('express');
var load = require('express-load');
var _dir = __dirname;
var jf = require('jsonfile');
var fs = require('fs');
var Path = require('path');
var events = require('events');
var expressLiquid = require('express-liquid');
var ns = require('lei-ns');
var help = require('utils/help');

function jbcms() {
  events.EventEmitter.call(this);
  this.app = express();
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
    "dbtype": "mysql",
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
    //this.app.set('views', _dir + '/' + cfg.viewPath);
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
  load: function(path) {
    if (this.loaders) this.loaders.then(path);
    else this.loaders = load(path);
    return this;
  },
  setConfig: function(path) {
    this.config = help.extendJsonFile(path, this.config);
    return this;
  },
  loadUserViews: function(skin) {
    this.app.set('skin', skin);
    return this;
  },
  _createNameSpace: function() {
    var loaded = {};
    if(this.loaders) this.loaders.into(loaded);
    this.ns = ns.Namespace();
    var nss = this.ns;
    for (var model in loaded) {
      nss(model, loaded[model]);
    }
    for (var i in nss()) {
      nss()[i].init.onload.call(this);
    }
  },
  _setRoutes: function() {
    var self = this;
    var nss = this.ns();
    var app = this.app;
    for (var i in nss) {
      var moddlewares = nss[i]['moddlewares'];
      if (moddlewares) {
        for (var handle in moddlewares) {
          this.app.use(moddlewares[handle]);
        }
      }
    }
    var ApiFilter = function() {
      var filters = [];
      for (var i in nss) {
        if (nss[i].apis) {
          for (var k in nss[i].apis) {
            var f = [];
            f[0] = i + '.apis.' + k;
            f[1] = nss[i].apis[k];
            filters.push(f);
          }
        }
      }
      return filters;
    } ();
    app.get('*', function(req, res, next) {
      var query = req.query;
      var view = Path.normalize(req.path).replace(/^\/|\/$/g, '').split('/');
      var modelname = view.shift();
      if (nss[modelname]) {
        var realfile = Path.join(_dir + '/' + modelname + '/views', view + app.settings['view engine']);
        if (fs.existsSync(realfile)) {
          var context = new expressLiquid.tinyliquid.Context();
          context.setLocals('query', query);
          context.setLocals('config', self.config);
          //注册所有api
          for (var i in ApiFilter) {
            var filter = ApiFilter[i];
            context.setAsyncFilter(filter[0], filter[1]);
          }
          res.render(realfile, {
            context: context
          });
        } else {
          next();
        }
      } else {
        next();
      }
    });
    app.post('*', function(req, res, next) {
      var postPath = Path.normalize(req.path).replace(/^\/|\/$/g, '');
      var methods = postPath.split('/');
      var controller = nss[methods[0]];
      if (controller) {
        var postMethod = controller.postMethods[methods[1]];
        if (postMethod) {
          postMethod.call(self, req, res, next);
        } else {
          next();
        }
      } else {
        next();
      }
    });
  },
  _initMysql: function(db) {
    this.schema = new Schema('mysql', {
      username: db.username,
      password: db.password,
      host: db.host,
      database: db.database
    });
  },
  _initMongodb: function(db) {
    this.schema = new Schema('mongodb', {
      url: db.url,
      database: db.database
    });
  },
  _initDB: function() {
    var dbtype = this.config.dbtype;
    var db = this.config.db[dbtype];
    if (dbtype == 'mysql') this._initMysql(db);
    else if (dbtype == 'mongodb') this._initMongodb(db);
  },
  init: function() {
    var config = this.config;
    this._setUp();
    this._initDB();
    this._createNameSpace();
    this._setRoutes();
    this.app.listen(config.port);
    console.log("%s running on %s port", config.host, config.port);
  }
};

module.exports = jbcms;

