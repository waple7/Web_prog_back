/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `title` to the `ListServices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TegsVacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListServices" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TegsVacancy" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";
