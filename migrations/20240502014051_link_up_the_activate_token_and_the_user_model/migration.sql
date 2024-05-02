/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `ActivateToken` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ActivateToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivateToken" DROP COLUMN "CreatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ActivateToken" ADD CONSTRAINT "ActivateToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
