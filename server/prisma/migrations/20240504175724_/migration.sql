/*
  Warnings:

  - You are about to drop the column `trainingTrainingId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `trainingTrainingId` on the `ExercisesOnTraining` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_trainingTrainingId_fkey";

-- DropForeignKey
ALTER TABLE "ExercisesOnTraining" DROP CONSTRAINT "ExercisesOnTraining_trainingTrainingId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "trainingTrainingId",
ADD COLUMN     "trainingId" INTEGER;

-- AlterTable
ALTER TABLE "ExercisesOnTraining" DROP COLUMN "trainingTrainingId";

-- AddForeignKey
ALTER TABLE "ExercisesOnTraining" ADD CONSTRAINT "ExercisesOnTraining_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("trainingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("trainingId") ON DELETE SET NULL ON UPDATE CASCADE;
