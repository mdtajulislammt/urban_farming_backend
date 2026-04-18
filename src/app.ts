import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit"; // 1. Rate limit import korun
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";

const app: Application = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Rate Limiter Setup ---
// Benchmark-er somoy 'max' value-ti barie rakhun jate error na ashe
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50000, // Load test-er somoy 50k kore dilam
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Sob route-e apply korar jonno (Swagger badeo kora jay, kintu benchmark-er jonno eita best)
app.use(limiter);

// --- Swagger UI Implementation ---
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);

// --- Application Routes ---
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

app.use(globalErrorHandler);

export default app;
