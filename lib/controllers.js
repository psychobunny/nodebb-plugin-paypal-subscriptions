'use strict';

var Controllers = {};

Controllers.renderAdminPage = function (req, res, next) {
	
	res.render('admin/plugins/paypal-subscriptions', {});
};

Controllers.instantPaypalNotification = function (req, res, next) {
	/*console.log(req.body);*/
	// assign posted variables to local variables
	var item_name = req.body['item_name'];
	var item_number = req.body['item_number'];
	var payment_status = req.body['payment_status'];
	var payment_amount = req.body['mc_gross'];
	var payment_currency = req.body['mc_currency'];
	var txn_id = req.body['txn_id'];
	var receiver_email = req.body['receiver_email'];
	var payer_email = req.body['payer_email'];
	var payer_status = req.body['payer_status'];
	var address_status = req.body['address_status'];
	var first_name = req.body['first_name'];
	var last_name = req.body['last_name'];
	
	/*Example Code (designed for ghost...but I'm sure you know more about NodeBB to get this working)*/
	//var note = payer_email+' purchased '+item_name+'#'+item_number+' now '+payment_status+' for '+payment_amount+payment_currency;
	var note = payer_email+'<br>'+item_name+' #'+item_number+'<br>'+payment_status+'<br>'+payment_amount+payment_currency;
	
	var notetype = 'info';
	var status = payment_status.toUpperCase();
	
	/*For styling purposes...*/
	if(status == "COMPLETED"){
		notetype = 'success';
	} 
	else if(status == "DENIED"){
		notetype = 'error';
	} 
	else if(status == "EXPIRED"){
		notetype = 'warn';
	} 
	else if(status == "FAILED"){
		notetype = 'error';
	}
	else if(status == "IN-PROGRESS"){
		notetype = 'info';
	}
	else if(status == "PARTIALLY_REFUNDED"){
		notetype = 'info';
	}
	else if(status == "PENDING"){
		notetype = 'info';
	}
	else if(status == "PROCESSED"){
		notetype = 'info';
	}
	else if(status == "REFUNDED"){
		notetype = 'warn';
	}
	else if(status == "REVERSED"){
		notetype = 'warn';
	}
	else if(status == "VOIDED"){
		notetype = 'warn';
	}
	else if(status == "CANCELED_REVERSAL"){
		notetype = 'warn';
	} else {
		notetype = 'info';
	}
	
	/*Ghost API...ignore this, this is just setting up a notification to popup of a certain style with the note string*/
	// type can be 'error', 'success', 'warn' and 'info'
	var notification = {
		type: notetype,
		message: note,
		location: 'top',
		dismissible: true
	};
	
	/*More styling, for another notification, this is based on the status of the transaction*/
	var usernote = 'info';
	if(address_status.toUpperCase() == 'UNCONFIRMED'){
		usernote = 'warn';
	} else if(payer_status.toUpperCase() == 'UNVERIFIED'){
		usernote = 'warn';
	}
	
	/*Called ghost's api...presumably needs only slight adjustment for NodeBB*/
	/*
	api.notifications.add({notifications: [{
		type: usernote,
		message: first_name+' '+last_name+':'+payer_email+'<br>Address:'+address_status+'<br>Account:'+payer_status,
	}]}, {context: {internal: true}});
	
	api.notifications.add({notifications: [{
		type: notetype,
		message: note,
	}]}, {context: {internal: true}});
	*/
	app.alert({
		type: notetype,
		alert_id: 'paypal-notification',
		title: 'Payment Notification',
		message: note,
		clickfn: function() {
			/*socket.emit('admin.reload');*/
		}
	});
	app.alert({
		type: usertype,
		alert_id: 'paypal-status-notification',
		title: 'Payment Status Notification',
		message: status,
		clickfn: function() {
			/*socket.emit('admin.reload');*/
		}
	});
	// Ping Back to Paypal that the notification went through per their specifications
	req.body = req.body || {};
	res.send(200, 'OK');
	res.end();

};

module.exports = Controllers;
