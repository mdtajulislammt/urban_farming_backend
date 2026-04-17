import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";
import sendResponse from "./utils/sendResponse";

const app: Application = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Swagger UI Implementation ---
// Access this at http://localhost:5000/api/docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Application Routes ---
// All routes will be prefixed with /api/v1
app.use("/api/v1", router);

// --- Root Route ---
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Interactive Urban Farming Platform API! 🚀",
    documentation: "/api/docs",
  });
});

// --- 404 Not Found Handler ---
// This middleware triggers if no routes match the request
app.use((req: Request, res: Response, next: NextFunction) => {
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

// --- Global Error Handler ---
// This must be the last middleware in the stack
app.use(globalErrorHandler);

export default app;