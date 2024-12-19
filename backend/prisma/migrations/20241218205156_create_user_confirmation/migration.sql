/*
  Warnings:

  - You are about to drop the `AccountConfirmation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AccountConfirmation";

-- CreateTable
CREATE TABLE "AppUserConfirmation" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "confirmationToken" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppUserConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUserConfirmation_username_key" ON "AppUserConfirmation"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AppUserConfirmation_confirmationToken_key" ON "AppUserConfirmation"("confirmationToken");
