/*
  Warnings:

  - Added the required column `role` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL;
