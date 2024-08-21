/*
  Warnings:

  - You are about to drop the `LeaderRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeaderRequest" DROP CONSTRAINT "LeaderRequest_userId_fkey";

-- DropTable
DROP TABLE "LeaderRequest";

-- CreateTable
CREATE TABLE "leader_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "verificationCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leader_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leader_requests" ADD CONSTRAINT "leader_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
