'use strict';

var async = module.parent.require('async'),
	request = module.parent.require('request'),
	winston = module.parent.require('winston'),
	cron = require('cron').CronJob,
	toMarkdown = require('to-markdown'),
	S = require('string'),

	nconf = module.parent.require('nconf'),
	meta = module.parent.require('./meta'),
	pubsub = module.parent.require('./pubsub'),
	topics = module.parent.require('./topics'),
	db = module.parent.require('./database'),
	user = module.parent.require('./user'),
	plugins = module.parent.require('./plugins');


(function(module) {

	var cronJobs = [];
	var settings = {};
	
	/*Make sensible cron jobs*/
	cronJobs.push(new cron('* * * * * *', function() { pullGroupsInterval('seconds'); }, null, false));
	cronJobs.push(new cron('00 00 0-23 * * *', function() { pullGroupsInterval('hour'); }, null, false));
	cronJobs.push(new cron('00 00 00 * * 0-6', function() { pullGroupsInterval('day'); }, null, false));
	cronJobs.push(new cron('00 00 00 * * 0', function() { pullGroupsInterval('week'); }, null, false));
	cronJobs.push(new cron('00 00 00 1 0-11 *', function() { pullGroupsInterval('month'); }, null, false));

	plugins.isActive('nodebb-plugin-paypal-subscriptions', function(err, active) {
		if (err) {
			return winston.error(err.stack);
		}

		if (active) {
			reStartCronJobs();
		}
	});

	module.onClearRequireCache = function(data, callback) {
		stopCronJobs();
		cronJobs.length = 0;
		callback(null, data);
	};

	module.init = function(params, callback) {
	  	var router = params.router,
	  		hostMiddleware = params.middleware,
	  		hostControllers = params.controllers;
	  
	    	router.post('/api/admin/plugins/paypal-subscriptions/ipn/:sandbox', controllers.instantPaypalNotification);
	  	router.get('/admin/plugins/paypal-subscriptions', params.middleware.applyCSRF, hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	  	router.get('/api/admin/plugins/paypal-subscriptions', params.middleware.applyCSRF, controllers.renderAdminPage);
	  
	  	callback();
	};

	function save(req, res, next) {
		deleteGroups(function(err) {
			if (err) {
				return next(err);
			}

			if (!req.body.feeds) {
				return res.json({message:'Groups saved!'});
			}

			async.parallel([
				function(next) {
					saveGroups(req.body.feeds, next);
				},
				function(next) {
					admin.saveSettings(req.body.settings, next);
				}
			], function(err) {
				if(err) {
					return next(err);
				}

				res.json({message: 'Groups saved!'});
			});
		});
	}

	function reStartCronJobs() {
		if (nconf.get('isPrimary') === 'true') {
			stopCronJobs();
			cronJobs.forEach(function(job) {
				job.start();
			});
		}
	}

	function stopCronJobs() {
		if (nconf.get('isPrimary') === 'true') {
			cronJobs.forEach(function(job) {
				job.stop();
			});
		}
	}
	/**/
	function pullGroupsInterval(interval) {
		admin.getGroups(function(err, groups) {
			if (err || !Array.isArray(groups)) {
				return;
			}
			groups = groups.filter(function(item) {
				/*No idea how to use this yet...*/
				return item && parseInt(item.interval, 10) === interval;
			});

			pullGroups(groups);
		});
	}

	function pullGroups(groups) {
		async.eachSeries(groups, pullGroups, function(err) {
			if (err) {
				winston.error(err.message);
			}
		});
	}

	function pullGroups(group, callback) {
		/*Do what on each subscription?*/
	}
	
	/*something like this:*/
	function giveUserTrialMembership(user,group,trialinterval,triallength){
		/*add user to group*/ 
		/*queue up job to remove the user from that group trialinterval x triallength from now*/
		/*...there's a few cron jobs which should ping at every interval...*/
		/*...add job revokeUserSubscription(user,group);*/
	}
	
	function extendTrialPeriod(user,group,trialinterval,triallength){
		/*double check the user's trial period in the subscription is less than the one the admin will give*/
		
		/*remove the user's previous trial period*/
		
		/*replace the grace trial with the new one*/
	}
	
	function giveUserGracePeriod(user,group,graceinterval,gracelength){
		/*at the end of a subscription, this function will be called, if there is no grace period to give the user will be removed instantly*/
	}
	
	/*For admins who'd like to be nice I'd imagine there'd be a button to do this*/
	function extendGracePeriod(user,group,graceinterval,gracelength){
		/*double check the user's grace period in the subscription is less than the one the admin will give*/
		
		/*remove the user's previous grace period*/
		
		/*replace the grace period with the new one*/
	}
	
	function addUserSubscription(user,group){
		/*add user to group*/
		/*remove all trial and grace periods*/
	}
	function revokeUserSubscription(user,group){
		/*remove user from group*/
	}

	var admin = {};

	admin.menu = function(custom_header, callback) {
		custom_header.plugins.push({
			route: '/plugins/paypal-subscriptions',
			icon: 'fa-paypal',
			name: 'Paypal Subscriptions'
		});
	
		callback(null, header);
	};

	admin.getGroups = function(callback) {
		db.getSetMembers('nodebb-plugin-paypal-subscriptions:groups', function(err, groupNames) {
			if (err) {
				return callback(err);
			}

			async.map(groupNames, function (groupName, next) {
				db.getObject('nodebb-plugin-paypal-subscriptions:group:' + groupName, next);
			}, function(err, results) {
				if (err) {
					return callback(err);
				}
				results.forEach(function(group) {
					if (group) {
					  /*Assign the defaults on the backend*/
						/*feed.entriesToPull = feed.entriesToPull || 4;*/
						group.cost = group.cost || 5;
						group.graceinterval = group.graceinterval || 'weeks';
						group.gracelength = group.gracelength || 0;
						group.trialinterval = group.trialinterval || 'weeks';
						group.triallength = groups.triallength || 0;
						group.interval = group.interval || 'months';
						group.length = group.length || 1;
						group.endbehavior = group.endbehavior || 'blocked';
					}
				});

				callback(null, results ? results : []);
			});
		});
	};

	admin.getSettings = function(callback) {
		db.getObject('nodebb-plugin-paypal-subscriptions:settings', function(err, settings) {
			if (err) {
				return callback(err);
			}
			settings = settings || {};

			/*settings.collapseWhiteSpace = parseInt(settings.collapseWhiteSpace, 10) === 1;*/
			callback(null, settings);
		});
	};

	admin.saveSettings = function(data, callback) {
		settings.setting1 = data.setting1;
		settings.setting2 = data.setting2;
		db.setObject('nodebb-plugin-paypal-subscriptions:settings', settings, function(err) {
			if (err) {
				return callback(err);
			}
			pubsub.publish('nodebb-plugin-paypal-subscriptions:settings', settings);
			callback();
		});
	};

	function saveGroups(groups, callback) {
		async.each(groups, function saveFeed(group, next) {
			if(!group.name && group.group) {
				return next();
			}
			async.parallel([
				function(next) {
					db.setObject('nodebb-plugin-paypal-subscriptions:group:' + group.name, group, next);
				},
				function(next) {
					db.setAdd('nodebb-plugin-paypal-subscriptions:groups', group.name, next);
				}
			], next);
		}, callback);
	}

	function deleteGroups(callback) {
		callback = callback || function() {};
		db.getSetMembers('nodebb-plugin-paypal-subscriptions:groups', function(err, groups) {
			if (err || !groups || !groups.length) {
				return callback(err);
			}

			async.each(groups, function(key, next) {
				async.parallel([
					function(next) {
						db.delete('nodebb-plugin-paypal-subscriptions:group:' + key, next);
					},
					function(next) {
						db.setRemove('nodebb-plugin-paypal-subscriptions:groups', key, next);
					}
				], next);
			}, callback);
		});
	}

	function deleteSettings(callback) {
		callback = callback || function() {};
		db.delete('nodebb-plugin-paypal-subscriptions:settings', callback);
	}

	pubsub.on('nodebb-plugin-paypal-subscriptions:activate', function() {
		reStartCronJobs();
	});

	pubsub.on('nodebb-plugin-paypal-subscriptions:deactivate', function() {
		stopCronJobs();
	});

	pubsub.on('nodebb-plugin-paypal-subscriptions:settings', function(newSettings) {
		settings = newSettings;
	});

	admin.activate = function(id) {
		if (id === 'nodebb-plugin-rss') {
			pubsub.publish('nodebb-plugin-paypal-subscriptions:activate');
		}
	};

	admin.deactivate = function(id) {
		if (id === 'nodebb-plugin-paypal-subscriptions') {
			pubsub.publish('nodebb-plugin-paypal-subscriptions:deactivate');
		}
	};

	admin.uninstall = function(id) {
		if (id === 'nodebb-plugin-paypal-subscriptions') {
			deleteGroups();
			deleteSettings();
		}
	};

	admin.getSettings(function(err, settingsData) {
		if (err) {
			return winston.error(err.message);
		}
		settings = settingsData;
	});

	module.admin = admin;

}(module.exports));
