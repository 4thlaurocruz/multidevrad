this.Asdasd = new Mongo.Collection("asdasd");

this.Asdasd.userCanInsert = function(userId, doc) {
	return true;
}

this.Asdasd.userCanUpdate = function(userId, doc) {
	return true;
}

this.Asdasd.userCanRemove = function(userId, doc) {
	return true;
}
