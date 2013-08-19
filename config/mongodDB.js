var Schema = require('jugglingdb').Schema;
var jf = require('jsonfile');
var config = jf.readFileSync('config/config.default.json');
var dbConfig = config.db.mysql;
var schema = new Schema('mongodb', {
  url: dbConfig.url,
  database: dbConfig.database
});
var Setting = schema.define('Setting', {
  sitename:String,
  description:String,
  skin:String,
  host:String,
  logo:String,
  headers:Array
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
var Comment = schema.define('Comment', {

});
var Tags = schema.define('Tags', {

});
var Pages = schema.define('Pages', {

});
module.exports = schema;

