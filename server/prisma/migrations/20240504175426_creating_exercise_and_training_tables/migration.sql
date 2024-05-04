-- CreateTable
CREATE TABLE "Training" (
    "trainingId" SERIAL NOT NULL,
    "trainingCategory" TEXT NOT NULL,
    "practitionerId" INTEGER NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("trainingId")
);

-- CreateTable
CREATE TABLE "ExercisesOnTraining" (
    "trainingId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "repetions" INTEGER NOT NULL,
    "Series" INTEGER NOT NULL,
    "load" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "trainingTrainingId" INTEGER NOT NULL,
    "exerciseExerciseId" INTEGER NOT NULL,

    CONSTRAINT "ExercisesOnTraining_pkey" PRIMARY KEY ("exerciseId","trainingId")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "exerciseId" SERIAL NOT NULL,
    "exerciseName" TEXT NOT NULL,
    "muscularGroup" TEXT NOT NULL,
    "exerciseDescription" TEXT NOT NULL,
    "trainingTrainingId" INTEGER,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("exerciseId")
);

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesOnTraining" ADD CONSTRAINT "ExercisesOnTraining_trainingTrainingId_fkey" FOREIGN KEY ("trainingTrainingId") REFERENCES "Training"("trainingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesOnTraining" ADD CONSTRAINT "ExercisesOnTraining_exerciseExerciseId_fkey" FOREIGN KEY ("exerciseExerciseId") REFERENCES "Exercise"("exerciseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_trainingTrainingId_fkey" FOREIGN KEY ("trainingTrainingId") REFERENCES "Training"("trainingId") ON DELETE SET NULL ON UPDATE CASCADE;
