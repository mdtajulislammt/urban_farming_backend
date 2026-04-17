import prisma from "./config/prisma";
import app from "./app";
const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is flying on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

main();
