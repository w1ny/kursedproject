/*
  Warnings:

  - You are about to drop the `AppUserConfirmation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AppUserConfirmation";

-- CreateTable
CREATE TABLE "AppUserValidate" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppUserValidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUserValidate_username_key" ON "AppUserValidate"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AppUserValidate_token_key" ON "AppUserValidate"("token");
