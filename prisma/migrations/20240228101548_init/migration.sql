/*
  Warnings:

  - You are about to drop the column `userId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `TagsVacancy` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacancyId` to the `TagsVacancy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_userId_fkey";

-- DropForeignKey
ALTER TABLE "TagsVacancy" DROP CONSTRAINT "TagsVacancy_tagId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "userId",
ADD COLUMN     "serviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TagsVacancy" DROP COLUMN "tagId",
ADD COLUMN     "vacancyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsVacancy" ADD CONSTRAINT "TagsVacancy_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
