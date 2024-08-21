/*
  Warnings:

  - You are about to drop the `leader_requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "leader_requests" DROP CONSTRAINT "leader_requests_userId_fkey";

-- DropTable
DROP TABLE "leader_requests";

-- DropEnum
DROP TYPE "RequestStatus";
