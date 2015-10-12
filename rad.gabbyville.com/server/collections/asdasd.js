Asdasd.allow({
	insert: function (userId, doc) {
		return Asdasd.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Asdasd.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Asdasd.userCanRemove(userId, doc);
	}
});

Asdasd.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Asdasd.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Asdasd.before.remove(function(userId, doc) {
	
});

Asdasd.after.insert(function(userId, doc) {
	
});

Asdasd.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Asdasd.after.remove(function(userId, doc) {
	
});
