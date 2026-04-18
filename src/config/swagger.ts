import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Urban Farming API",
      version: "1.0.0",
      description: "API documentation for the Urban Farming application",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      { name: "Auth", description: "Authentication API" },
      { name: "Marketplace", description: "Organic produce marketplace" },
      { name: "Vendor", description: "Vendor and Farm profile management" },
      { name: "Order", description: "Order management and purchase history" },
      { name: "Rental", description: "Farming equipment rental system" },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["src/modules/**/*.routes.ts", "src/modules/**/*.dto.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
