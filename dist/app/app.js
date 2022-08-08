"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = __importDefault(require("./routes"));
const authentication_1 = require("./config/authentication");
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const var_1 = __importDefault(require("./config/var"));
const docsFilePath = path_1.default.resolve(__dirname, '../../src/docs/openApi.yaml');
const jsonDocsFile = yamljs_1.default.load(docsFilePath);
const docs = (0, swagger_jsdoc_1.default)({
    swaggerDefinition: jsonDocsFile,
    apis: ['./src/app/**/*.ts'],
});
const app = (0, express_1.default)();
// initialize configuration
(0, authentication_1.jwtAuth)();
// express pipeline middleware configuration
app.use('/api/swagger', (0, authentication_1.basicAuth)(var_1.default.apiDocsName, var_1.default.apiDocsPassword, true), swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs, { explorer: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use('/api/v1', routes_1.default);
app.use(errorMiddleware_1.default);
process.on('unhandledRejection', (reason) => {
    throw reason;
});
process.on('uncaughtException', (error) => {
    (0, errorMiddleware_1.default)(error);
});
exports.default = app;
