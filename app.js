var jbcms = require('./jbcms');

var myjb = new jbcms();
myjb.setConfig('config/config.default.json').load('controllers').load('routes.js').loadUserViews('default').init();

