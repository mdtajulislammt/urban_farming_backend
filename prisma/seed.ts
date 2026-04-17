import { UserRole, CertStatus } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../src/config/prisma';

async function main() {
  console.log("🌱 Seeding started...");

  const hashedPassword = await bcrypt.hash('password123', 12);

  // Admin User
  await prisma.user.upsert({
    where: { email: 'admin@urbanfarm.com' },
    update: {},
    create: {
      name: 'Platform Admin',
      email: 'admin@urbanfarm.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  // Vendors and Products
  for (let i = 1; i <= 10; i++) {
    const vendorEmail = `vendor${i}@farm.com`;
    
    await prisma.user.upsert({
      where: { email: vendorEmail },
      update: {},
      create: {
        name: `Farmer Korim ${i}`,
        email: vendorEmail,
        password: hashedPassword,
        role: UserRole.VENDOR,
        vendor_profile: {
          create: {
            farm_name: `Green Oasis Farm ${i}`,
            farm_location: `Sector ${i}, Uttara, Dhaka`,
            certification_status: CertStatus.APPROVED,
            products: {
              create: Array.from({ length: 10 }).map((_, j) => ({
                name: `Organic Product ${i}-${j + 1}`,
                description: `Fresh and healthy organic product from farm ${i}`,
                price: Math.floor(Math.random() * (500 - 50 + 1)) + 50,
                category: j % 2 === 0 ? 'Vegetables' : 'Fruits',
                available_quantity: 50,
                certification_status: CertStatus.APPROVED,
              })),
            },
          },
        },
      },
    });
  }

  // Customers
  for (let i = 1; i <= 5; i++) {
    await prisma.user.upsert({
      where: { email: `customer${i}@gmail.com` },
      update: {},
      create: {
        name: `Customer ${i}`,
        email: `customer${i}@gmail.com`,
        password: hashedPassword,
        role: UserRole.CUSTOMER,
      },
    });
  }

  console.log("✅ Seeding completed! 10 Vendors and 100 Products added.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });