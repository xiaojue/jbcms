var Schema = require('jugglingdb').Schema;
var jf = require('jsonfile');
var config = jf.readFileSync('config/config.default.json');
var dbConfig = config.db.mysql;
var schema = new Schema('mysql', {
	username: dbConfig.username,
	password: dbConfig.password,
	host: dbConfig.host,
	database: dbConfig.database
});
var User = schema.define('User', {
	name: String,
	uid: Number,
	pwd: String,
	createdAt: {
		'type': Date,
		'default': function() {
			return new Date;
		}
	},
	purview: String
});
var Artice = schema.define('Artice', {
	title: {
		'type': String,
		'length': 225
	},
	content: {
		'type': Schema.Text
	},
	date: {
		'type': Date,
		'default': function() {
			return new Date;
		}
	},
	aid: Number,
	published: {
		'type': Boolean,
		'default': false,
		'index': true
	}
});
schema.automigrate();
module.exports = schema;

