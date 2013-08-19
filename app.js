var express = require('express');
var load = require('express-load');
var app = express();
var _dir = __dirname;
var jf = require('jsonfile');
var config = jf.readFileSync('config/config.default.json');
var DB = require('config/mysqlDB.js');
var fs = require('fs');
//var DB = require('config/mongodDB.js');
var expressLiquid = require('express-liquid');
var LiquidOptions = {
	customTags: {}
};
app.set('config', config);
app.set('db', DB);
app.set('views', _dir + '/views');
app.set('view engine', '.html');
app.engine('.html', expressLiquid(LiquidOptions));
app.use(express['static'](_dir + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({
	secret: 'jbcms.org',
	cookie: {
		path: '*'
	}
}));

load('apis').then('controllers').then('routes').into(app);

app.listen(config.port);
console.log("%s running on %s port", config.host, config.port);

