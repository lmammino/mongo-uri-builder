'use strict';

var extend = require('util')._extend;

module.exports = function (options) {
	var defaults = {
		host: 'localhost'
	};

	options = extend(defaults, options);

	// schema
	var uri = 'mongodb://';

	// username and password
	if (options.username && options.password) {
		uri += options.username + ':' + options.password + '@';
	}

	// host
	uri += options.host;

	// port
	if (options.port) {
		uri += ':' + options.port;
	}

	// replicas
	if (options.replicas) {
		options.replicas.forEach(function (replica) {
			uri += ',' + replica.host;
			if (replica.port) {
				uri += ':' + replica.port;
			}
		});
	}

	// database & options
	if (options.database || options.options) {
		uri += '/';
	}

	if (options.database) {
		uri += options.database;
	}

	if (options.options) {
		var pairs = [];

		for (var prop in options.options) {
			if (options.options.hasOwnProperty(prop)) {
				var k = encodeURIComponent(prop);
				var v = encodeURIComponent(options.options[prop]);
				pairs.push(k + '=' + v);
			}
		}

		if (pairs) {
			uri += '?' + pairs.join('&');
		}
	}

	return uri;
};
