/*
  Warnings:

  - You are about to alter the column `key` on the `Configuration` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the `AppUserWallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppUser" DROP CONSTRAINT "AppUser_walletId_fkey";

-- AlterTable
ALTER TABLE "Configuration" ALTER COLUMN "key" SET DATA TYPE VARCHAR(100);

-- DropTable
DROP TABLE "AppUserWallet";
