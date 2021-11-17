"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.schema = void 0;
var nexus_1 = require("nexus");
var path_1 = require("path");
var types = __importStar(require("./types"));
exports.schema = (0, nexus_1.makeSchema)({
    types: types,
    outputs: {
        typegen: (0, path_1.join)(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
        schema: (0, path_1.join)(process.cwd(), 'graphql', 'schema.graphql')
    },
    contextType: {
        "export": 'Context',
        module: (0, path_1.join)(process.cwd(), 'src', 'server.ts')
    }
});
//# sourceMappingURL=schema.js.map