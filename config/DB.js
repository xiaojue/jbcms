var Schema = require('jugglingdb').Schema;
var schema = require('mysql', {
	port: 3306
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
},
{
	restPath: '../apis/users'
});
var Artice = schema.define('Artice', {
	title: {
		'type': String,
		'length': 225
	},
	content: {
		'type': Scheam.Text
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
},
{
	restPath: '../apis/artice'
});
schema.automigrate();
module.exports = schema;
