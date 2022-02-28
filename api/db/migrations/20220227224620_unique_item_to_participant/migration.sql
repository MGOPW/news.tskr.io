/*
  Warnings:

  - A unique constraint covering the columns `[feedItemId,participantId]` on the table `FeedItemParticipant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeedItemParticipant_feedItemId_participantId_key" ON "FeedItemParticipant"("feedItemId", "participantId");
