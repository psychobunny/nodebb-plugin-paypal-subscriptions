'use strict';

var Controllers = {};
var groups = require.main.require('./src/groups');

Controllers.renderAdminPage = function (req, res, next) {
	getGroupList(function(err, groups) {
		res.render('admin/plugins/paypal-subscriptions', {
			groups: groups
		});
	});
};

function getGroupList(callback) {
	var list = [''];

	groups.getGroups('groups:createtime', 0, -1, function(err, groups) {
		groups.forEach(function(group) {
			if (group.match(/cid:([0-9]*):/) === null && group !== 'administrators' && group !== 'registered-users') {
				list.push({
					name: group,
					value: group
				});
			}
		});

		callback(err, list);
	});
}


module.exports = Controllers;