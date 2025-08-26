-- AlterTable
ALTER TABLE "public"."Ticket" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "priority" DROP NOT NULL,
ALTER COLUMN "category" DROP NOT NULL;
