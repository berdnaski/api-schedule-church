/*
  Warnings:

  - A unique constraint covering the columns `[scheduleId,userId]` on the table `schedule_participants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "schedule_participants_scheduleId_userId_key" ON "schedule_participants"("scheduleId", "userId");
