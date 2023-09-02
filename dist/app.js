"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import globalErrorHandler from './middleware/globalErrorHandler';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
//App
const app = (0, express_1.default)();
// Cors
app.use((0, cors_1.default)());
// Parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({
    extended: true
}));
// Entrance
// For Development
app.use('/api/v1', routes_1.default);
// Global Error handler
app.use(globalErrorHandler_1.default);
// Handle Not found routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found'
            }
        ]
    });
    next();
});
exports.default = app;
