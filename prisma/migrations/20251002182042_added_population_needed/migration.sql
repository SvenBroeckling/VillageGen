/*
  Warnings:

  - Added the required column `populationNeeded` to the `Feature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "populationNeeded" INTEGER NOT NULL;
