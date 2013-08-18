module.exports = function(app) {
	var db = app.get('db');
	var User = db.models.User;
	return new User;
};

