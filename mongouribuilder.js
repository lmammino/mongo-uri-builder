"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var uribuilder_1 = require("uribuilder");
var getOptions = function (options) {
    var model = {};
    var keys = Object.keys(options);
    keys.forEach(function (key) {
        var value = options[key];
        model[key] = value;
    });
    return model;
};
var getHost = function (config) {
    var hostString = [config.host + ":" + config.port];
    if (config.replicas) {
        config.replicas.forEach(function (replica) {
            hostString.push(replica.host + ":" + replica.port);
        });
    }
    return hostString.join(",");
};
var applyReplicates = function (url, replicas) {
    var replicaString = [];
    replicas.forEach(function (replica) {
        replicaString.push(replica.host + ":" + replica.port);
    });
    if (replicaString.length < 1)
        return null;
    replicaString.unshift(url.host + ":" + url.port);
    return replicaString.join(",");
};
exports.mongouribuilder = function (options) {
    var defaults = {
        host: "localhost",
        port: 27017,
    };
    var config = __assign({ host: "localhost" }, options);
    var uriBuilder = new uribuilder_1.UriBuilder();
    uriBuilder.schema = "mongodb";
    if (config.username && config.password) {
        uriBuilder.setAuthority(config.username, config.password);
    }
    if (config.database)
        uriBuilder.setPath(config.database);
    if (config.options)
        uriBuilder.query = getOptions(config.options);
    uriBuilder.host = getHost(config);
    return uriBuilder;
};
//# sourceMappingURL=mongouribuilder.js.map