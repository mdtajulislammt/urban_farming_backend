"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Swagger UI
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Application Routes
app.use("/api/v1", routes_1.default);
// Root Route
app.get("/", (req, res) => {
    res.send("Urban Farming API is running! 🚀 View docs at /api/docs");
});
// 404 Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        errorSources: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
});
// Global Error Handler
app.use(globalErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map