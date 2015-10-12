Sad.allow({
	insert: function (userId, doc) {
		return Sad.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Sad.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Sad.userCanRemove(userId, doc);
	}
});

Sad.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Sad.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Sad.before.remove(function(userId, doc) {
	
});

Sad.after.insert(function(userId, doc) {
	
});

Sad.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Sad.after.remove(function(userId, doc) {
	
});
