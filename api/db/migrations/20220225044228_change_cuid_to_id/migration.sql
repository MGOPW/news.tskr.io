/*
  Warnings:

  - The primary key for the `Feed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Feed` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `FeedItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FeedItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `FeedItemParticipant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FeedItemParticipant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Participant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `feedId` to the `FeedItem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `feedItemId` on the `FeedItemParticipant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `participantId` on the `FeedItemParticipant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "FeedItemParticipant" DROP CONSTRAINT "FeedItemParticipant_feedItemId_fkey";

-- DropForeignKey
ALTER TABLE "FeedItemParticipant" DROP CONSTRAINT "FeedItemParticipant_participantId_fkey";

-- AlterTable
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Feed_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FeedItem" DROP CONSTRAINT "FeedItem_pkey",
ADD COLUMN     "feedId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FeedItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FeedItemParticipant" DROP CONSTRAINT "FeedItemParticipant_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "feedItemId",
ADD COLUMN     "feedItemId" INTEGER NOT NULL,
DROP COLUMN "participantId",
ADD COLUMN     "participantId" INTEGER NOT NULL,
ADD CONSTRAINT "FeedItemParticipant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "FeedItem" ADD CONSTRAINT "FeedItem_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedItemParticipant" ADD CONSTRAINT "FeedItemParticipant_feedItemId_fkey" FOREIGN KEY ("feedItemId") REFERENCES "FeedItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedItemParticipant" ADD CONSTRAINT "FeedItemParticipant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
