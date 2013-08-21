exports.Setting = function() {
	return this.schema.define('Setting', {
		sitename: String,
		description: String,
		skin: String,
		host: String,
		logo: String,
		headers: Array
	});
};

