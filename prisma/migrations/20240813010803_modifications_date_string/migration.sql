/*
  Warnings:

  - You are about to drop the `_UserSchedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');

-- DropForeignKey
ALTER TABLE "_UserSchedules" DROP CONSTRAINT "_UserSchedules_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserSchedules" DROP CONSTRAINT "_UserSchedules_B_fkey";

-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "time" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "_UserSchedules";

-- CreateTable
CREATE TABLE "schedule_participants" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_participants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule_participants" ADD CONSTRAINT "schedule_participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_participants" ADD CONSTRAINT "schedule_participants_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
