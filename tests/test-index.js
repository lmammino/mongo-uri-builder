'use strict';

// mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

var test = require('tape');
var mongoUriBuilder = require('../');

test('Build with default params', function (t) {
	var expected = 'mongodb://localhost';

	t.equal(mongoUriBuilder(), expected);
	t.end();
});

test('Build with custom host', function (t) {
	var expected = 'mongodb://custom';

	t.equal(mongoUriBuilder({
		host: 'custom'
	}), expected);
	t.end();
});

test('Build with custom port number', function (t) {
	var expected = 'mongodb://localhost:6666';

	t.equal(mongoUriBuilder({
		port: 6666
	}), expected);

	t.end();
});

test('Build with username and password', function (t) {
	var expected = 'mongodb://user:pass@localhost';

	t.equal(mongoUriBuilder({
		username: 'user',
		password: 'pass'
	}), expected);

	t.end();
});

test('Build with replica sets', function (t) {
	var expected = 'mongodb://localhost,domain1,domain2,domainWithPort:3333';

	t.equal(mongoUriBuilder({
		replicas: [
			{host: 'domain1'},
			{host: 'domain2'},
			{host: 'domainWithPort', port: '3333'}
		]
	}), expected);

	t.end();
});

test('Build with database', function (t) {
	var expected = 'mongodb://localhost/db';

	t.equal(mongoUriBuilder({
		database: 'db'
	}), expected);

	t.end();
});

test('Build with options', function (t) {
	var expected = 'mongodb://localhost/?w=0&readPreference=secondary';

	t.equal(mongoUriBuilder({
		options: {
			w: 0,
			readPreference: 'secondary'
		}
	}), expected);

	t.end();
});

test('Build with everything', function (t) {
	var expected = 'mongodb://user:pass@host1:1111,host2:2222,host3:3333/db?w=0&readPreference=secondary';

	t.equal(mongoUriBuilder({
		username: 'user',
		password: 'pass',
		host: 'host1',
		port: 1111,
		replicas: [
			{host: 'host2', port: 2222},
			{host: 'host3', port: 3333}
		],
		database: 'db',
		options: {
			w: 0,
			readPreference: 'secondary'
		}
	}), expected);

	t.end();
});
