/*
  Warnings:

  - You are about to drop the column `vacancyId` on the `Vacancy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vacancy" DROP CONSTRAINT "Vacancy_vacancyId_fkey";

-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "vacancyId",
ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
