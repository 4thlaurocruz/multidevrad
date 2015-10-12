Fffff.allow({
	insert: function (userId, doc) {
		return Fffff.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Fffff.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Fffff.userCanRemove(userId, doc);
	}
});

Fffff.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Fffff.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Fffff.before.remove(function(userId, doc) {
	
});

Fffff.after.insert(function(userId, doc) {
	
});

Fffff.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Fffff.after.remove(function(userId, doc) {
	
});
