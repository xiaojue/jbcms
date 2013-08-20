var jbcms = require('./jbcms');

var myjb = new jbcms();
myjb.setConfig('config/config.default.json');
myjb.load('controllers').load('routes.js');
myjb.loadUserViews('default');
myjb.init();

