/*
  Warnings:

  - You are about to drop the column `tripsId` on the `TripReservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TripReservation" DROP CONSTRAINT "TripReservation_tripsId_fkey";

-- AlterTable
ALTER TABLE "TripReservation" DROP COLUMN "tripsId",
ADD COLUMN     "tripId" TEXT;

-- AddForeignKey
ALTER TABLE "TripReservation" ADD CONSTRAINT "TripReservation_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
