-- CreateEnum
CREATE TYPE "TicketKind" AS ENUM ('FULL', 'HALF');

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "ticketKind" "TicketKind" NOT NULL,
    "spotId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resevations_histories" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "ticketKind" "TicketKind" NOT NULL,
    "status" "StatusSpot" NOT NULL,
    "spotId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resevations_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_email_key" ON "tickets"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_spotId_key" ON "tickets"("spotId");

-- CreateIndex
CREATE INDEX "tickets_ticketKind_idx" ON "tickets"("ticketKind");

-- CreateIndex
CREATE UNIQUE INDEX "resevations_histories_email_key" ON "resevations_histories"("email");

-- CreateIndex
CREATE INDEX "resevations_histories_ticketKind_status_idx" ON "resevations_histories"("ticketKind", "status");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resevations_histories" ADD CONSTRAINT "resevations_histories_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
