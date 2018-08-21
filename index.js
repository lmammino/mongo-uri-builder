'use strict';

module.exports = function (config) {
	const defaults = {
		host: 'localhost'
	};

	config = Object.assign({}, defaults, config);

	// Schema
	let uri = 'mongodb://';

	if (config.username) {
		uri += config.username;
	}

	if (config.password) {
		uri += ':' + config.password;
	}

	if (config.username) {
		uri += '@';
	}

	// Host
	uri += config.host;

	// Port
	if (config.port) {
		uri += ':' + config.port;
	}

	// Replicas
	if (config.replicas) {
		config.replicas.forEach(replica => {
			uri += ',' + replica.host;
			if (replica.port) {
				uri += ':' + replica.port;
			}
		});
	}

	// Database & options
	if (config.database || config.options) {
		uri += '/';
	}

	if (config.database) {
		uri += config.database;
	}

	if (config.options) {
		const pairs = [];

		for (const prop in config.options) {
			if (Object.prototype.hasOwnProperty.call(config.options, prop)) {
				const k = encodeURIComponent(prop);
				const v = encodeURIComponent(config.options[prop]);
				pairs.push(k + '=' + v);
			}
		}

		if (pairs) {
			uri += '?' + pairs.join('&');
		}
	}

	return uri;
};
