"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (...roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token)
            throw new Error("Unauthorized");
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (roles.length && !roles.includes(decoded.role)) {
            throw new Error("Forbidden: You do not have permission");
        }
        req.user = decoded; // Need to extend Express Request type
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map