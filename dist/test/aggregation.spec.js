"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var aggregation_js_1 = require("../utils/aggregation.js");
var collection_js_1 = require("../utils/collection.js");
var insert_js_1 = require("../utils/insert.js");
var default_args = {
    uri: 'mongodb://localhost:27017',
    collection: 'aggregation_collection',
    database: 'aggregation_database',
    pipeline: [{ id: 1, aggregation: 'aggregation_result' }, { id: 2 }, { id: 3 }],
};
describe('Aggregation tests', function () {
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, collection_js_1.dropCollection)(default_args).catch(function (err) {
                        if (err.toString().includes('MongoServerError: ns not found')) {
                        }
                        else {
                            throw err;
                        }
                    })];
                case 1:
                    _a.sent();
                    return [4, (0, collection_js_1.createCollection)(default_args)];
                case 2:
                    _a.sent();
                    return [4, (0, insert_js_1.insertMany)(default_args)];
                case 3:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it('Should fail with missing uri error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var pipeline, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pipeline = [{ $match: { id: 1 } }];
                    args = { uri: '', database: '', collection: '', pipeline: pipeline };
                    return [4, (0, aggregation_js_1.aggregate)(args)
                            .then(function (res) {
                            throw new Error('Should fail with missing uri error');
                        })
                            .catch(function (err) {
                            assert.match(err.toString(), /Missing MONGODB_URI environment variable/);
                        })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it('Should fail with missing database name error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var pipeline, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pipeline = [{ $match: { id: 1 } }];
                    args = {
                        uri: default_args.uri,
                        database: '',
                        collection: default_args.collection,
                        pipeline: pipeline,
                    };
                    return [4, (0, aggregation_js_1.aggregate)(args)
                            .then(function (res) {
                            throw new Error('Should fail with missing database name error');
                        })
                            .catch(function (err) {
                            assert.match(err.toString(), /Error: Database not specified/);
                        })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it('Should fail with missing collection name error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var pipeline, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pipeline = [{ $match: { id: 1 } }];
                    args = {
                        uri: default_args.uri,
                        database: default_args.database,
                        collection: '',
                        pipeline: pipeline,
                    };
                    return [4, (0, aggregation_js_1.aggregate)(args)
                            .then(function (res) {
                            throw new Error('Should fail with missing collection name error');
                        })
                            .catch(function (err) {
                            assert.match(err.toString(), /Error: Collection not specified/);
                        })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it('Should match all documents', function () { return __awaiter(void 0, void 0, void 0, function () {
        var args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = {
                        uri: default_args.uri,
                        database: default_args.database,
                        collection: default_args.collection,
                        pipeline: [],
                    };
                    return [4, (0, aggregation_js_1.aggregate)(args).then(function (res) {
                            assert.notEqual(res, undefined);
                            assert.equal(res.length, 3);
                        })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it('Should match specific documents', function () { return __awaiter(void 0, void 0, void 0, function () {
        var pipeline, args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pipeline = [{ $match: { id: 1 } }];
                    args = {
                        uri: default_args.uri,
                        database: default_args.database,
                        collection: default_args.collection,
                        pipeline: pipeline,
                    };
                    return [4, (0, aggregation_js_1.aggregate)(args).then(function (res) {
                            assert.notEqual(res[0], undefined);
                            assert.equal(res[0].aggregation, 'aggregation_result');
                        })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
});
