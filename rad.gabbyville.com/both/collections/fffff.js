this.Fffff = new Mongo.Collection("fffff");

this.Fffff.userCanInsert = function(userId, doc) {
	return true;
}

this.Fffff.userCanUpdate = function(userId, doc) {
	return true;
}

this.Fffff.userCanRemove = function(userId, doc) {
	return true;
}
