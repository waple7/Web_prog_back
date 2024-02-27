/*
  Warnings:

  - You are about to drop the column `content` on the `Service` table. All the data in the column will be lost.
  - Added the required column `service` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "content",
ADD COLUMN     "service" TEXT NOT NULL;
