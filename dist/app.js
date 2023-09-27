"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.port = 5000;
const cors_1 = __importDefault(require("cors"));
// import cookieParser from 'cookie-parser';
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const sendResponse_1 = __importDefault(require("./shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
app.use((0, cors_1.default)());
//parser
// app.use(cookieParser())
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.default);
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found route
app.use((req, res, nex) => {
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.NOT_FOUND,
        success: false,
        message: "not found",
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
