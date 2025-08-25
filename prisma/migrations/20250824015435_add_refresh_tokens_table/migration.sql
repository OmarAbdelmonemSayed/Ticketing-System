-- CreateTable
CREATE TABLE "public"."Refrehs_Tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Refrehs_Tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Refrehs_Tokens" ADD CONSTRAINT "Refrehs_Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
