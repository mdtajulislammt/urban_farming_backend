import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../modules/auth/auth.interface";

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message:
            "Unauthorized! Please provide a token in 'Bearer <token>' format.",
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as IJwtPayload;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have permission to access this route",
        });
      }

      req.user = decoded;
      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message:
          error.message === "jwt expired" ? "Token expired" : "invalid token",
      });
    }
  };

export default auth;
