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
exports.IdentityMutation = exports.IdentityQuery = exports.IdentityProps = exports.Identity = void 0;
var apollo_server_errors_1 = require("apollo-server-errors");
var nexus_1 = require("nexus");
exports.Identity = (0, nexus_1.objectType)({
    name: 'Identity',
    definition: function (t) {
        t.int('id');
        t.string('created_at');
        t.string('first_name');
        t.string('last_name');
        t.string('platform_id'); // This is where I need to store either the anonId or the sub id
        t.string('platform');
        t.boolean('main');
        t.int('main_id');
        t.int('utc_hour');
        t.int('organization_id');
        t.list.field('identity_props', {
            type: exports.IdentityProps,
            resolve: function (_parent, _args, ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.prisma.identityProp
                                    .findMany({
                                    where: {}
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            }
        });
    }
});
exports.IdentityProps = (0, nexus_1.objectType)({
    name: 'IdentityProps',
    definition: function (t) {
        t.int('id');
        t.string('value');
        t.string('type');
        t.string('name');
        t.int('identityId');
    }
});
// How to handle apollo upsert - https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
exports.IdentityQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition: function (t) {
        t.field('identity', {
            type: 'Identity',
            resolve: function (_parent, _args, _a) {
                var isAuthenticated = _a.isAuthenticated, prisma = _a.prisma;
                return __awaiter(this, void 0, void 0, function () {
                    var queryResult, isAuthed, e_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                queryResult = null;
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, isAuthenticated];
                            case 2:
                                isAuthed = _b.sent();
                                return [4 /*yield*/, prisma.identity.findUnique({
                                        where: {
                                            email: 'jordanbundy@gmail.com'
                                        }
                                    })];
                            case 3:
                                queryResult = _b.sent();
                                return [2 /*return*/, queryResult];
                            case 4:
                                e_1 = _b.sent();
                                throw new apollo_server_errors_1.AuthenticationError('You must be logged in to do this');
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            }
        });
    }
});
exports.IdentityMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition: function (t) {
        t.field('createAnonymousUser', {
            type: exports.Identity,
            resolve: function (_parent, _args, _a) {
                var prisma = _a.prisma;
                return __awaiter(this, void 0, void 0, function () {
                    var queryResult, e_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                queryResult = null;
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, prisma.identity.create({
                                        data: {
                                        // I don't think we need to pass anything in just yet
                                        }
                                    })];
                            case 2:
                                queryResult = _b.sent();
                                return [2 /*return*/, queryResult];
                            case 3:
                                e_2 = _b.sent();
                                throw new Error(e_2);
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }
        });
    }
});
//# sourceMappingURL=Identity.js.map