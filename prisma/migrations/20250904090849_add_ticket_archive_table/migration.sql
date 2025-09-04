-- CreateTable
CREATE TABLE "public"."Ticket_Archive" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "public"."TicketStatus" DEFAULT 'OPEN',
    "priority" "public"."TicketPriority" DEFAULT 'LOW',
    "category" "public"."TicketCategory" DEFAULT 'GENERAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_Archive_pkey" PRIMARY KEY ("id")
);
