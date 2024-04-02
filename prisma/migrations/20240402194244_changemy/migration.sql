/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ListServices` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TagsVacancy` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Vacancy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "ListServices" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "TagsVacancy" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Vacancy" DROP COLUMN "createdAt";
