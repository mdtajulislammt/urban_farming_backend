/*
  Warnings:

  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendor_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "shipping_address" TEXT,
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vendor_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
