-- CreateEnum
CREATE TYPE "StatusSpot" AS ENUM ('AVAILABLE', 'RESERVED');

-- CreateTable
CREATE TABLE "spots" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" "StatusSpot" NOT NULL DEFAULT 'AVAILABLE',
    "eventId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "spots_name_key" ON "spots"("name");

-- CreateIndex
CREATE INDEX "spots_status_idx" ON "spots"("status");

-- AddForeignKey
ALTER TABLE "spots" ADD CONSTRAINT "spots_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
