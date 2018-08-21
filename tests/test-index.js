'use strict';

// mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

const test = require('tape');
const mongoUriBuilder = require('..');

test('Build with default params', t => {
	const expected = 'mongodb://localhost';

	t.equal(mongoUriBuilder(), expected);
	t.end();
});

test('Build with custom host', t => {
	const expected = 'mongodb://custom';

	t.equal(mongoUriBuilder({
		host: 'custom'
	}), expected);
	t.end();
});

test('Build with custom port number', t => {
	const expected = 'mongodb://localhost:6666';

	t.equal(mongoUriBuilder({
		port: 6666
	}), expected);

	t.end();
});

test('Build with username and password', t => {
	const expected = 'mongodb://user:pass@localhost';

	t.equal(mongoUriBuilder({
		username: 'user',
		password: 'pass'
	}), expected);

	t.end();
});

test('Build with kerberos style (username only)', t => {
	const expected = 'mongodb://principal@server/?authMechanism=GSSAPI&gssapiServiceName=mongodb';

	t.equal(mongoUriBuilder({
		username: 'principal',
		host: 'server',
		options: {
			authMechanism: 'GSSAPI',
			gssapiServiceName: 'mongodb'
		}
	}), expected);

	t.end();
});

test('Build with replica sets', t => {
	const expected = 'mongodb://localhost,domain1,domain2,domainWithPort:3333';

	t.equal(mongoUriBuilder({
		replicas: [
			{host: 'domain1'},
			{host: 'domain2'},
			{host: 'domainWithPort', port: '3333'}
		]
	}), expected);

	t.end();
});

test('Build with database', t => {
	const expected = 'mongodb://localhost/db';

	t.equal(mongoUriBuilder({
		database: 'db'
	}), expected);

	t.end();
});

test('Build with options', t => {
	const expected = 'mongodb://localhost/?w=0&readPreference=secondary';

	t.equal(mongoUriBuilder({
		options: {
			w: 0,
			readPreference: 'secondary'
		}
	}), expected);

	t.end();
});

test('Build with everything', t => {
	const expected = 'mongodb://user:pass@host1:1111,host2:2222,host3:3333/db?w=0&readPreference=secondary';

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
