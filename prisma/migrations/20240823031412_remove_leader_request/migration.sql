/*
  Warnings:

  - You are about to drop the `leader_request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "leader_request" DROP CONSTRAINT "leader_request_userId_fkey";

-- DropTable
DROP TABLE "leader_request";

-- DropEnum
DROP TYPE "LeaderRequestStatus";
