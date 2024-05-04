/*
  Warnings:

  - You are about to drop the column `trainingId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_trainingId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "trainingId";
