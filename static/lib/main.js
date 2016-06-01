"use strict";
/*global app, bootbox, ajaxify*/

$('document').ready(function() {
	$(window).on('action:ajaxify.end', function(err, data) {
		if (!ajaxify.currentPage) {
			var href = window.location.href;

			if (href.match('subscribe=fail')) {
				app.alertError('We were unable to process your subscription - you have not been charged.');
			} else if (href.match('subscribe=success')) {
				app.alertSuccess('You have successfully subscribed to our forum.');
			} else if (href.match('subscribe=already-subscribed')) {
				app.alertError('You are already subscribed to our forum.');
			} else if (href.match('subscribe=cancel-fail')) {
				app.alertError('We were unable to cancel your subscription. Please contact an administrator.');
			} else if (href.match('subscribe=cancel-success')) {
				app.alertSuccess('We have successfully cancelled your subscription.');
			}
		}

		if (ajaxify.currentPage.match('user/')) {
			$('#btn-cancel-subscription').on('click', function() {
				bootbox.confirm('Are you sure you want to end your subscription? You will not be able to access member-only content anymore.', function(bool) {
					if (bool) {
						$('#cancel-subscription').submit();
					}
				});
			});
		}

		if (ajaxify.currentPage.match('topic/') && !ajaxify.data.tid) {
			ajaxify.go('subscribe');
		} else if (ajaxify.currentPage.match('category/') && !ajaxify.data.cid) {
			ajaxify.go('subscribe');
		}
	});
});