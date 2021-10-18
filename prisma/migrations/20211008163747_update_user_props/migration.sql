-- CreateEnum
CREATE TYPE "ExerciseFieldType" AS ENUM ('STRING', 'INTEGER', 'SELECT', 'ARRAY', 'HIDDEN', 'REFERENCE', 'CONTENT', 'DEPENDANT', 'SKIP', 'REPEAT');

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseFields" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "ExerciseFieldType" NOT NULL,

    CONSTRAINT "ExerciseFields_pkey" PRIMARY KEY ("id")
);
