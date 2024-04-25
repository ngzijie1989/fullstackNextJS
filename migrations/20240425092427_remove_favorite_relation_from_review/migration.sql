/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_favoriteId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "favoriteId";
