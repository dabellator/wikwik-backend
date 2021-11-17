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
var apollo_server_lambda_1 = require("apollo-server-lambda");
var schema_1 = require("./schema");
var client_1 = require("@prisma/client");
var verifyToken_1 = require("./utils/verifyToken");
var prisma = new client_1.PrismaClient();
var server = new apollo_server_lambda_1.ApolloServer({
    schema: schema_1.schema,
    context: function (_a) {
        var event = _a.event;
        return __awaiter(void 0, void 0, void 0, function () {
            var isAuthenticated, authID, anonID, authHeader, _b, type, token, payload, authIdentity, anonHeader, anonIdentity, e_1;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        isAuthenticated = false;
                        // need to manage current user vs anon
                        console.log("******----*****", event);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, , 9]);
                        authHeader = ((_c = event.headers) === null || _c === void 0 ? void 0 : _c.authorization) || '';
                        if (!authHeader) return [3 /*break*/, 5];
                        _b = authHeader.split(' '), type = _b[0], token = _b[1];
                        if (!(type === 'Bearer')) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, verifyToken_1.verifyToken)(token)];
                    case 2:
                        payload = _d.sent();
                        isAuthenticated = payload ? true : false;
                        return [4 /*yield*/, prisma.identity.upsert({
                                where: { platform_id: payload.sub },
                                update: {},
                                create: {
                                    platform_id: payload.sub
                                }
                            })];
                    case 3:
                        authIdentity = _d.sent();
                        authID = authIdentity.id;
                        _d.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        anonHeader = event.headers && event.headers['x-anon-id'] || '';
                        if (!anonHeader) return [3 /*break*/, 7];
                        return [4 /*yield*/, prisma.identity.upsert({
                                where: { platform_id: anonHeader },
                                update: {},
                                create: {
                                    platform_id: anonHeader
                                }
                            })];
                    case 6:
                        anonIdentity = _d.sent();
                        anonID = anonIdentity.id;
                        _d.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_1 = _d.sent();
                        throw new Error(e_1);
                    case 9: return [2 /*return*/, {
                            isAuthenticated: isAuthenticated,
                            authID: authID,
                            anonID: anonID,
                            prisma: prisma
                        }];
                }
            });
        });
    }
});
// server.listen().then(async ({ url }) => {
//   console.log(`\
// 🚀 Server ready at: ${url}
// ⭐️ See sample queries: http://pris.ly/e/js/graphql#using-the-graphql-api
//   `)
// })
exports.graphqlHandler = server.createHandler({
    expressGetMiddlewareOptions: {
        cors: {
            origin: '*',
            credentials: true
        }
    }
});
//# sourceMappingURL=server.js.map