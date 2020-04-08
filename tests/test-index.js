'use strict'

// mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

const tap = require('tap')
const mongoUriBuilder = require('..')

tap.test('Build with default params', async () => {
  const expected = 'mongodb://localhost'

  tap.equal(mongoUriBuilder(), expected)
})

tap.test('Build with custom host', async () => {
  const expected = 'mongodb://custom'

  tap.equal(mongoUriBuilder({
    host: 'custom'
  }), expected)
})

tap.test('Build with custom port number', async () => {
  const expected = 'mongodb://localhost:6666'

  tap.equal(mongoUriBuilder({
    port: 6666
  }), expected)
})

tap.test('Build with username and password', async () => {
  const expected = 'mongodb://user:pass@localhost'

  tap.equal(mongoUriBuilder({
    username: 'user',
    password: 'pass'
  }), expected)
})

tap.test('Build with user and password', async () => {
  const expected = 'mongodb://user:pass@localhost'

  tap.equal(mongoUriBuilder({
    user: 'user',
    password: 'pass'
  }), expected)
})

tap.test('Build with kerberos style (username only)', async () => {
  const expected = 'mongodb://principal@server/?authMechanism=GSSAPI&gssapiServiceName=mongodb'

  tap.equal(mongoUriBuilder({
    username: 'principal',
    host: 'server',
    options: {
      authMechanism: 'GSSAPI',
      gssapiServiceName: 'mongodb'
    }
  }), expected)
})

tap.test('Build with replica sets', async () => {
  const expected = 'mongodb://localhost,domain1,domain2,domainWithPort:3333'

  tap.equal(mongoUriBuilder({
    replicas: [
      { host: 'domain1' },
      { host: 'domain2' },
      { host: 'domainWithPort', port: '3333' }
    ]
  }), expected)
})

tap.test('Build with database', async () => {
  const expected = 'mongodb://localhost/db'

  tap.equal(mongoUriBuilder({
    database: 'db'
  }), expected)
})

tap.test('Build with options', async () => {
  const expected = 'mongodb://localhost/?w=0&readPreference=secondary'

  tap.equal(mongoUriBuilder({
    options: {
      w: 0,
      readPreference: 'secondary'
    }
  }), expected)
})

tap.test('Build with everything', async () => {
  const expected = 'mongodb://user:pass@host1:1111,host2:2222,host3:3333/db?w=0&readPreference=secondary'

  tap.equal(mongoUriBuilder({
    username: 'user',
    password: 'pass',
    host: 'host1',
    port: 1111,
    replicas: [
      { host: 'host2', port: 2222 },
      { host: 'host3', port: 3333 }
    ],
    database: 'db',
    options: {
      w: 0,
      readPreference: 'secondary'
    }
  }), expected)
})
