-- CreateTable
CREATE TABLE "plant_trackings" (
    "id" TEXT NOT NULL,
    "rental_space_id" TEXT NOT NULL,
    "plant_name" TEXT NOT NULL,
    "health_status" TEXT NOT NULL DEFAULT 'Healthy',
    "growth_stage" TEXT NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_url" TEXT,

    CONSTRAINT "plant_trackings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plant_trackings" ADD CONSTRAINT "plant_trackings_rental_space_id_fkey" FOREIGN KEY ("rental_space_id") REFERENCES "rental_spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
