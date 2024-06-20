/*
  Warnings:

  - You are about to alter the column `economy` on the `vices` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "vices" ALTER COLUMN "economy" SET DATA TYPE INTEGER;
