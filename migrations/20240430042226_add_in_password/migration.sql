/*
  Warnings:

  - You are about to drop the column `Provider` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Provider",
ADD COLUMN     "password" TEXT,
ADD COLUMN     "provider" TEXT;
