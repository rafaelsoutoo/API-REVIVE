/*
  Warnings:

  - Made the column `unit` on table `economy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "economy" ALTER COLUMN "unit" SET NOT NULL;
