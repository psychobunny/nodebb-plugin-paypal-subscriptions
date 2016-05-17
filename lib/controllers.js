'use strict';

var Controllers = {};

Controllers.renderAdminPage = function (req, res, next) {
	
	res.render('admin/plugins/paypal-subscriptions', {});
};

module.exports = Controllers;