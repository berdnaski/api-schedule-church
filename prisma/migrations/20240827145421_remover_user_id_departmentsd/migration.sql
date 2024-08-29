/*
  Warnings:

  - You are about to drop the column `userId` on the `departments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "departments" DROP CONSTRAINT "departments_userId_fkey";

-- AlterTable
ALTER TABLE "departments" DROP COLUMN "userId";
