/*
  Warnings:

  - Added the required column `exercise_id` to the `ExerciseField` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseField" ADD COLUMN     "exercise_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "test" INTEGER[];

-- AddForeignKey
ALTER TABLE "ExerciseField" ADD CONSTRAINT "ExerciseField_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
