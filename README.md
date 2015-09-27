# mongo-uri-builder
A node.js module to easily create MongoDB connection strings using configuration objects

[![Build Status](https://travis-ci.org/lmammino/mongo-uri-builder.svg)](https://travis-ci.org/lmammino/mongo-uri-builder) [![npm version](https://badge.fury.io/js/mongo-uri-builder.svg)](http://badge.fury.io/js/mongo-uri-builder) [![coverage](https://coveralls.io/repos/lmammino/mongo-uri-builder/badge.svg?branch=master&service=github)](https://coveralls.io/github/lmammino/mongo-uri-builder?branch=master)

[![NPM](https://nodei.co/npm/mongo-uri-builder.png)](https://nodei.co/npm/mongo-uri-builder/)


## Rationale

Most of the existing MongoDB libraries (e.g. the official MongoClient or Mongoose) uses connection strings to connect to your running mongo instances which most of the times is very quick and convenient.
Anyway sometime you want to have your MongoDB connection details organized in a nice javascript object so that you can easily serialize it in a configuration file and be able to override some specific values in different environments (e.g. "development" or "production") without having to override the entire connection string. 

With this module you can easily accomplish this goal and in general you will be able to easily generate a MongoDB connection string starting from an organized javascript object that you can manipulate as you wish.


## Quick example

```javascript
var mongoUriBuilder = require('mongo-uri-builder');

var connectionString = mongoUriBuilder({
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
});

console.log(connectionString); 

// prints "mongodb://user:pass@host1:1111,host2:2222,host3:3333/db?w=0&readPreference=secondary"
```


## Install

As easy as running:

```bash
npm install --save mongo-uri-builder
```


## Usage

As shown in the previous example the module exposes just a function that accepts an optional structured object as parameter. If no parameter is given the default `MongoDB://localhost` will be built.

### Available options:

All the options are optional and the following example describes all the available ones:

```javascript
{
	username: 'user', // the username
	password: 'pass', // the password
	host: 'host1', // the main host (default: "localhost")
	port: 1111, // the main port
	replicas: [ // an array of replica databases
		{host: 'host2', port: 2222}, // every replica must define an host, the port is optional
		{host: 'host3', port: 3333}
	],
	database: 'db', // the name of the database
	options: { // an arbitrary object of connection options
		w: 0,
		readPreference: 'secondary'
	}
}
```

## Contributing

Everyone is very welcome to contribute to this project. You can contribute just by submitting bugs or suggesting improvements by [opening an issue on GitHub](https://github.com/lmammino/mongo-uri-builder/issues).

You can also submit PRs as long as you adhere with the code standards and write tests for the proposed changes.

### Code standard

[XO](https://www.npmjs.com/package/xo) conventions and tools are used as code standard. You can easily check if your edits conforms the standard by running:

```bash
npm run check-style
```

### Tests

[Tape](https://www.npmjs.com/package/tape) is used as default test runner. You can easily run the tests by using:

```bash
npm run tests
```

### Coverage

[Covert](https://www.npmjs.com/package/covert) can be used to check tests coverage by running:

```bash
npm run coverage
```


## License

Licensed under [MIT License](https://github.com/lmammino/mongo-uri-builder/blob/master/LICENSE). © Luciano Mammino.
