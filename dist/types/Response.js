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
exports.__esModule = true;
exports.ResponseMutation = exports.ResponseQuery = exports.ResponseValueInput = exports.Response = exports.ResponseValue = void 0;
var nexus_1 = require("nexus");
exports.ResponseValue = (0, nexus_1.objectType)({
    name: 'ResponseValue',
    definition: function (t) {
        t.int('id');
        t.string('name');
        t.string('value');
        t.int('response_id');
    }
});
exports.Response = (0, nexus_1.objectType)({
    name: 'Response',
    definition: function (t) {
        t.int('id');
        t.int('identity_id');
        t.int('exercise_id');
        t.list.field('values', {
            type: exports.ResponseValue
        });
    }
});
exports.ResponseValueInput = (0, nexus_1.inputObjectType)({
    name: 'ResponseValueInput',
    definition: function (t) {
        t.nonNull.string('name');
        t.nonNull.string('value');
    }
});
exports.ResponseQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition: function (t) {
        t.field('getMyResponses', {
            type: (0, nexus_1.list)('Response'),
            resolve: function (_root, _args, _a) {
                var prisma = _a.prisma, isAuthenticated = _a.isAuthenticated, authID = _a.authID, anonID = _a.anonID;
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, prisma.response.findMany({
                                    where: {
                                        identity_id: isAuthenticated ? authID : anonID
                                    },
                                    include: {
                                        values: true
                                    }
                                })];
                            case 1: return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            }
        });
    }
});
// Handle Response Mutation
exports.ResponseMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition: function (t) {
        t.nonNull.field('createResponse', {
            type: 'Response',
            args: {
                values: (0, nexus_1.list)((0, nexus_1.arg)({ type: exports.ResponseValueInput })),
                exercise: (0, nexus_1.nonNull)((0, nexus_1.intArg)())
            },
            resolve: function (_root, args, _a) {
                var prisma = _a.prisma, isAuthenticated = _a.isAuthenticated, authID = _a.authID, anonID = _a.anonID;
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, prisma.response.create({
                                    data: {
                                        identity_id: isAuthenticated ? authID : anonID,
                                        exercise_id: args.exercise,
                                        values: {
                                            createMany: {
                                                data: args.values
                                            }
                                        }
                                    },
                                    include: {
                                        values: true
                                    }
                                })];
                            case 1:
                                response = _b.sent();
                                return [2 /*return*/, response];
                        }
                    });
                });
            }
        });
    }
});
//# sourceMappingURL=Response.js.map