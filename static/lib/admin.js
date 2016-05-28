'use strict';
/* globals $, app, socket */

define('admin/plugins/paypal-subscriptions', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('paypal-subscriptions', $('.paypal-subscriptions-settings'));

		$('#save').on('click', function() {
			Settings.save('paypal-subscriptions', $('.paypal-subscriptions-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'paypal-subscriptions-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});