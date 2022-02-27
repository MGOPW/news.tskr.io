-- AlterTable
ALTER TABLE "Feed" ADD COLUMN     "feedIcon" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'participant';

-- CreateTable
CREATE TABLE "_FeedToParticipant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeedToParticipant_AB_unique" ON "_FeedToParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedToParticipant_B_index" ON "_FeedToParticipant"("B");

-- AddForeignKey
ALTER TABLE "_FeedToParticipant" ADD FOREIGN KEY ("A") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedToParticipant" ADD FOREIGN KEY ("B") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
