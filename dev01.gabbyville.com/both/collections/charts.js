this.Charts = new Mongo.Collection("charts");

this.Charts.userCanInsert = function(userId, doc) {
	return true;
}

this.Charts.userCanUpdate = function(userId, doc) {
	return true;
}

this.Charts.userCanRemove = function(userId, doc) {
	return true;
}

this.Schemas = this.Schemas || {};

this.Schemas.Charts = new SimpleSchema({
});

this.Charts.attachSchema(this.Schemas.Charts);
