-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('Free', 'Premium', 'VIP');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
