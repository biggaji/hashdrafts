-- CreateTable
CREATE TABLE "HashnodeConfig" (
    "id" TEXT NOT NULL,
    "hostUrls" TEXT[],
    "personalAccessToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HashnodeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HashnodeConfig_userId_key" ON "HashnodeConfig"("userId");

-- AddForeignKey
ALTER TABLE "HashnodeConfig" ADD CONSTRAINT "HashnodeConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
