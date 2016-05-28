"use strict";

var controllers = require('./lib/controllers'),
	paypal = require('./lib/paypal'),

	plugin = {};

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;

	paypal.configure();

	router.get('/admin/plugins/paypal-subscriptions', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/paypal-subscriptions', controllers.renderAdminPage);

	router.get('/subscribe', hostMiddleware.buildHeader, paypal.subscribe);
	router.get('/api/subscribe', paypal.subscribe);

	router.post('/subscribe', paypal.onSubscribe);

	router.get('/paypal-subscriptions/success', paypal.onSuccess);

	router.post('/paypal-subscriptions/cancel-subscription', paypal.cancelSubscription);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/paypal-subscriptions',
		icon: 'fa-paypal',
		name: 'Paypal Subscriptions'
	});

	callback(null, header);
};

plugin.addSubscriptionSettings = function(data, callback) {
	paypal.isSubscribed(data.uid, function(err, isSubscribed) {
		if (isSubscribed) {
			data.customSettings.push({
				title: 'Forum Subscription',
				content: '<button class="btn btn-danger" id="btn-cancel-subscription">Cancel Subscription</button><form id="cancel-subscription" method="POST" action="/paypal-subscriptions/cancel-subscription"></form>'
			});
		}

		callback(null, data);
	});
};

module.exports = plugin;