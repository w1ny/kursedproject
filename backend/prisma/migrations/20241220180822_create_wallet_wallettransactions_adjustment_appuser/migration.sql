/*
  Warnings:

  - You are about to drop the column `email` on the `AppUser` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `AppUser` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `AppUser` table. All the data in the column will be lost.
  - You are about to drop the `AppUserValidate` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `walletId` on table `AppUser` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('owner', 'admin', 'user');

-- CreateEnum
CREATE TYPE "NetworkType" AS ENUM ('mainnet', 'testnet');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('send', 'receive', 'contract_call', 'approve', 'stake', 'other');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('pending', 'success', 'failed');

-- DropIndex
DROP INDEX "AppUser_email_key";

-- AlterTable
ALTER TABLE "AppUser" DROP COLUMN "email",
DROP COLUMN "nickname",
DROP COLUMN "password",
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'user',
ALTER COLUMN "username" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "walletId" SET NOT NULL;

-- DropTable
DROP TABLE "AppUserValidate";

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "address" VARCHAR(42) NOT NULL,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "network" VARCHAR(50) NOT NULL,
    "balance" DECIMAL(18,8) NOT NULL DEFAULT 0.0,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nickname" VARCHAR(255),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "networkType" "NetworkType" NOT NULL DEFAULT 'testnet',
    "clientVersion" VARCHAR(255),

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletTransactions" (
    "id" TEXT NOT NULL,
    "transactionHash" VARCHAR(66) NOT NULL,
    "walletAddress" VARCHAR(42) NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "amount" DECIMAL(18,8) NOT NULL DEFAULT 0.0,
    "currency" VARCHAR(50) NOT NULL DEFAULT 'ETH',
    "status" "TransactionStatus" NOT NULL DEFAULT 'pending',
    "gasFee" DECIMAL(18,8) NOT NULL DEFAULT 0.0,
    "toAddress" VARCHAR(42),
    "fromAddress" VARCHAR(42),
    "blockNumber" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "WalletTransactions_transactionHash_key" ON "WalletTransactions"("transactionHash");

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransactions" ADD CONSTRAINT "WalletTransactions_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "Wallet"("address") ON DELETE CASCADE ON UPDATE CASCADE;
