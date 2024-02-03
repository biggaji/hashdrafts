/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Integration` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Integration" ADD COLUMN     "connected" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Integration_type_key" ON "Integration"("type");
