/*
  Warnings:

  - You are about to drop the `Refrehs_Tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Refrehs_Tokens" DROP CONSTRAINT "Refrehs_Tokens_userId_fkey";

-- DropTable
DROP TABLE "public"."Refrehs_Tokens";

-- CreateTable
CREATE TABLE "public"."Refresh_Tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Refresh_Tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Refresh_Tokens" ADD CONSTRAINT "Refresh_Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
