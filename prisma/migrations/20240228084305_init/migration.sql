/*
  Warnings:

  - You are about to drop the column `role` on the `ListServices` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `ListServices` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ListServices` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Vacancy` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vacancy` table. All the data in the column will be lost.
  - Added the required column `vacancyId` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vacancy" DROP CONSTRAINT "Vacancy_userId_fkey";

-- AlterTable
ALTER TABLE "ListServices" DROP COLUMN "role",
DROP COLUMN "service",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "role",
DROP COLUMN "userId",
ADD COLUMN     "vacancyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TegsVacancy" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tegId" INTEGER NOT NULL,

    CONSTRAINT "TegsVacancy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TegsVacancy" ADD CONSTRAINT "TegsVacancy_tegId_fkey" FOREIGN KEY ("tegId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
