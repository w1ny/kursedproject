/*
  Warnings:

  - You are about to drop the column `confirmationToken` on the `AppUserConfirmation` table. All the data in the column will be lost.
  - You are about to drop the `Config` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `AppUserConfirmation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `AppUserConfirmation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AppUserConfirmation_confirmationToken_key";

-- AlterTable
ALTER TABLE "AppUserConfirmation" DROP COLUMN "confirmationToken",
ADD COLUMN     "token" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Config";

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_key_key" ON "Configuration"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AppUserConfirmation_token_key" ON "AppUserConfirmation"("token");
