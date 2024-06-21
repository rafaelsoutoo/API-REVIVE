/*
  Warnings:

  - Added the required column `originalAmount` to the `economy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "economy" ADD COLUMN     "originalAmount" DOUBLE PRECISION NOT NULL;
