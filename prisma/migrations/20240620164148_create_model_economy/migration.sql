/*
  Warnings:

  - You are about to drop the column `economy` on the `vices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vices" DROP COLUMN "economy";

-- CreateTable
CREATE TABLE "economy" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vice_id" TEXT NOT NULL,

    CONSTRAINT "economy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "economy" ADD CONSTRAINT "economy_vice_id_fkey" FOREIGN KEY ("vice_id") REFERENCES "vices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
