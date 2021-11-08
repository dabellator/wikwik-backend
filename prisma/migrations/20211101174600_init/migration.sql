-- CreateEnum
CREATE TYPE "ExerciseFieldType" AS ENUM ('STRING', 'INTEGER', 'SELECT', 'ARRAY', 'HIDDEN', 'REFERENCE', 'CONTENT', 'DEPENDANT', 'SKIP', 'REPEAT');

-- CreateTable
CREATE TABLE "IdentityProp" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identityId" INTEGER NOT NULL,

    CONSTRAINT "IdentityProp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicLink" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL,

    CONSTRAINT "MagicLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identity" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT,
    "platform_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL DEFAULT E'anonymous',
    "main" BOOLEAN NOT NULL DEFAULT true,
    "main_id" INTEGER,
    "last_name" TEXT,
    "utc_hour" INTEGER NOT NULL DEFAULT 0,
    "organization_id" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Identity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseField" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "ExerciseFieldType" NOT NULL,
    "exercise_id" INTEGER NOT NULL,

    CONSTRAINT "ExerciseField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseFieldOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "exercise_field_id" INTEGER NOT NULL,

    CONSTRAINT "ExerciseFieldOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponseValue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "response_id" INTEGER NOT NULL,

    CONSTRAINT "ResponseValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "identity_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identity_id" INTEGER NOT NULL,
    "response_id" INTEGER NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "parent_id" INTEGER,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Identity_email_key" ON "Identity"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Identity_platform_id_key" ON "Identity"("platform_id");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Document_identity_id_key" ON "Document"("identity_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToOrganization_AB_unique" ON "_ExerciseToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToOrganization_B_index" ON "_ExerciseToOrganization"("B");

-- AddForeignKey
ALTER TABLE "IdentityProp" ADD CONSTRAINT "IdentityProp_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "Identity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseField" ADD CONSTRAINT "ExerciseField_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseFieldOption" ADD CONSTRAINT "ExerciseFieldOption_exercise_field_id_fkey" FOREIGN KEY ("exercise_field_id") REFERENCES "ExerciseField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseValue" ADD CONSTRAINT "ResponseValue_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_identity_id_fkey" FOREIGN KEY ("identity_id") REFERENCES "Identity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_identity_id_fkey" FOREIGN KEY ("identity_id") REFERENCES "Identity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToOrganization" ADD FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToOrganization" ADD FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
