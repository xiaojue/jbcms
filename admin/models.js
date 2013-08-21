module.exports = function(loaders) {
	return {
		Setting: function() {
			var Setting = loaders.schema.define('Setting', {
				sitename: String,
				description: String,
				skin: String,
				host: String,
				logo: String,
				headers: Array
			});
			return Setting;
		}
	};
};

