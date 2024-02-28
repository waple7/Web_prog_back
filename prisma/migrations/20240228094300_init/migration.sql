/*
  Warnings:

  - You are about to drop the `TegsVacancy` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TegsVacancy" DROP CONSTRAINT "TegsVacancy_tegId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "TegsVacancy";

-- CreateTable
CREATE TABLE "TagsVacancy" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagsVacancy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagsVacancy" ADD CONSTRAINT "TagsVacancy_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
