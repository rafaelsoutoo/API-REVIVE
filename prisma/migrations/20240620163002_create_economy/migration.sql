/*
  Warnings:

  - Added the required column `economy` to the `vices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vices" ADD COLUMN     "economy" DOUBLE PRECISION NOT NULL;
