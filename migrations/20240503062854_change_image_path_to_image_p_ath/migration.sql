/*
  Warnings:

  - You are about to drop the column `image_path` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "image_path",
ADD COLUMN     "imagePath" TEXT;
