/*
  Warnings:

  - You are about to drop the `ExerciseFields` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExerciseFields";

-- CreateTable
CREATE TABLE "ExerciseField" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "ExerciseFieldType" NOT NULL,

    CONSTRAINT "ExerciseField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InitialExercise" (
    "id" SERIAL NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "InitialExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InitialExercise" ADD CONSTRAINT "InitialExercise_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitialExercise" ADD CONSTRAINT "InitialExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
