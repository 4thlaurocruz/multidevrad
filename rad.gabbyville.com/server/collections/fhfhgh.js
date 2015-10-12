Fhfhgh.allow({
	insert: function (userId, doc) {
		return Fhfhgh.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Fhfhgh.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Fhfhgh.userCanRemove(userId, doc);
	}
});

Fhfhgh.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Fhfhgh.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Fhfhgh.before.remove(function(userId, doc) {
	
});

Fhfhgh.after.insert(function(userId, doc) {
	
});

Fhfhgh.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Fhfhgh.after.remove(function(userId, doc) {
	
});
