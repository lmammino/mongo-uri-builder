"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongouribuilder_1 = require("../mongouribuilder");
var chai_1 = require("chai");
describe("Mongo Uri Builder Tests", function () {
    var config;
    before(function () {
        config = {
            username: "user1",
            password: "pass1",
            host: "192.168.0.15",
            port: 27017,
            replicas: [{
                    host: "localhost",
                    port: 1224
                }],
            database: "test1",
            options: {
                connectTimeoutMS: 1000
            }
        };
    });
    it("should generated url eq  mongodb://localhost:27017", function () {
        var expectedUri = "mongodb://localhost:27017/";
        var uri = mongouribuilder_1.mongouribuilder({
            host: "localhost",
            port: 27017
        });
        chai_1.expect(uri.toString()).to.be.eq(expectedUri);
    });
    it("should generated url host match match replica", function () {
        var uri = mongouribuilder_1.mongouribuilder(config);
        chai_1.expect(uri.toString()).to.match(/,[\w]+:[\d]+/);
    });
    it("should generated url includes username and password", function () {
        var uri = mongouribuilder_1.mongouribuilder(config);
        chai_1.expect(uri.toString()).to.match(/[\w\d]+:[\w\d]+@/);
    });
});
//# sourceMappingURL=urlstirng.spec.js.map