-- CreateTable
CREATE TABLE "AccountConfirmation" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "confirmationToken" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountConfirmation_username_key" ON "AccountConfirmation"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AccountConfirmation_confirmationToken_key" ON "AccountConfirmation"("confirmationToken");
