/*
  Warnings:

  - You are about to drop the `HashnodeConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "IntegrationEnum" AS ENUM ('hashnode', 'github');

-- DropForeignKey
ALTER TABLE "HashnodeConfig" DROP CONSTRAINT "HashnodeConfig_userId_fkey";

-- AlterTable
ALTER TABLE "Draft" ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "title" DROP NOT NULL;

-- DropTable
DROP TABLE "HashnodeConfig";

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "type" "IntegrationEnum" NOT NULL,
    "hostUrls" TEXT[],
    "personalAccessToken" TEXT,
    "installationId" INTEGER,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
