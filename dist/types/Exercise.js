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
exports.ExerciseQuery = exports.ExerciseFieldType = exports.Organization = exports.ExerciseField = exports.Exercise = void 0;
var apollo_server_errors_1 = require("apollo-server-errors");
var nexus_1 = require("nexus");
exports.Exercise = (0, nexus_1.objectType)({
    name: 'Exercise',
    definition: function (t) {
        t.int('id');
        t.string('created_at');
        t.string('name');
        t.list.field('fields', {
            type: exports.ExerciseField,
            resolve: function (parent, _args, ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.prisma.exerciseField
                                    .findMany({
                                    where: {
                                        exercise_id: parent.id
                                    }
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            }
        });
    }
});
exports.ExerciseField = (0, nexus_1.objectType)({
    name: 'ExerciseField',
    definition: function (t) {
        t.int('id');
        t.string('name');
        t.string('label');
        t.field('type', { type: exports.ExerciseFieldType });
        t.list.string('options', {
            resolve: function (parent, _args, ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    var results;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.prisma.exerciseFieldOption
                                    .findMany({
                                    where: {
                                        exercise_field_id: parent.id
                                    },
                                    select: {
                                        value: true
                                    }
                                })];
                            case 1:
                                results = _a.sent();
                                return [2 /*return*/, results.map(function (obj) { return obj.value; })];
                        }
                    });
                });
            }
        });
    }
});
exports.Organization = (0, nexus_1.objectType)({
    name: 'Organization',
    definition: function (t) {
        t.int('id');
        t.string('name');
        t.nonNull.list.nonNull.field('initial_exercises', { type: exports.Exercise });
    }
});
exports.ExerciseFieldType = (0, nexus_1.enumType)({
    name: 'ExerciseFieldType',
    members: [
        'STRING',
        'INTEGER',
        'SELECT',
        'ARRAY',
        'HIDDEN',
        'REFERENCE',
        'CONTENT',
        'DEPENDANT',
        'SKIP',
        'REPEAT',
    ]
});
// Handle onboarding here - or should it be a part of organization?
// Handle Exercise fetching (CRUD)
exports.ExerciseQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition: function (t) {
        t.field('organization', {
            type: exports.Organization,
            args: {
                org_name: (0, nexus_1.stringArg)({ "default": 'default' })
            },
            resolve: function (_parent, args, _a) {
                var prisma = _a.prisma;
                return __awaiter(this, void 0, void 0, function () {
                    var queryResult, orderedExercises, newQuery, e_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                queryResult = null;
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, prisma.organization.findUnique({
                                        where: {
                                            name: args.org_name
                                        },
                                        include: {
                                            initial_exercises: true
                                        }
                                    })];
                            case 2:
                                queryResult = _b.sent();
                                orderedExercises = queryResult.exercise_order.map(function (exerciseName) {
                                    return queryResult.initial_exercises.find(function (exercise) { return exercise.name === exerciseName; });
                                });
                                newQuery = Object.assign({}, queryResult, { initial_exercises: orderedExercises });
                                return [2 /*return*/, newQuery];
                            case 3:
                                e_1 = _b.sent();
                                throw new apollo_server_errors_1.AuthenticationError('Onboard not found.');
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }
        }),
            t.field('exercise', {
                type: exports.Exercise,
                args: {
                    id: (0, nexus_1.intArg)()
                },
                resolve: function (_parent, args, _a) {
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
                                    return [4 /*yield*/, prisma.exercise.findUnique({
                                            where: {
                                                id: args.id
                                            }
                                        })];
                                case 2:
                                    queryResult = _b.sent();
                                    return [2 /*return*/, queryResult];
                                case 3:
                                    e_2 = _b.sent();
                                    throw new apollo_server_errors_1.AuthenticationError('Exercise not found.');
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                }
            });
    }
});
//# sourceMappingURL=Exercise.js.map