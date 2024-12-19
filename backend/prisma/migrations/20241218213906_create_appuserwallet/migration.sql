-- CreateTable
CREATE TABLE "AppUserWallet" (
    "id" TEXT NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppUserWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUserWallet_address_key" ON "AppUserWallet"("address");

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "AppUserWallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
