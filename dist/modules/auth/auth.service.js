"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const registerUser = async (payload) => {
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 12);
    const result = await prisma_1.default.user.create({
        data: {
            ...payload,
            password: hashedPassword
        },
        select: { id: true, name: true, email: true, role: true, created_at: true }
    });
    return result;
};
const loginUser = async (payload) => {
    const isUserExist = await prisma_1.default.user.findUnique({
        where: { email: payload.email }
    });
    if (!isUserExist)
        throw new Error("User does not exist");
    const isPasswordMatched = await bcrypt_1.default.compare(payload.password, isUserExist.password);
    if (!isPasswordMatched)
        throw new Error("Password incorrect");
    const token = jsonwebtoken_1.default.sign({ userId: isUserExist.id, role: isUserExist.role }, JWT_SECRET, { expiresIn: '1d' });
    return { token };
};
exports.AuthService = { registerUser, loginUser };
//# sourceMappingURL=auth.service.js.map