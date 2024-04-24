/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_title_key" ON "Favorite"("title");
