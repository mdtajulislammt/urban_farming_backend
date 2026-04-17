import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../modules/auth/auth.interface';

const auth = (...roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) throw new Error("Unauthorized");

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload;

        if (roles.length && !roles.includes(decoded.role)) {
            throw new Error("Forbidden: You do not have permission");
        }

        req.user = decoded; // Need to extend Express Request type
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: (error as Error).message });
    }
};

export default auth;    