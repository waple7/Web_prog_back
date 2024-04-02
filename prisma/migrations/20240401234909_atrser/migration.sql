/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_serviceId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "serviceId",
ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
