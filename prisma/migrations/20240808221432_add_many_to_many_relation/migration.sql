/*
  Warnings:

  - You are about to drop the column `departmentId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_departmentId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "departmentId";

-- CreateTable
CREATE TABLE "_UserDepartments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserDepartments_AB_unique" ON "_UserDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_UserDepartments_B_index" ON "_UserDepartments"("B");

-- AddForeignKey
ALTER TABLE "_UserDepartments" ADD CONSTRAINT "_UserDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDepartments" ADD CONSTRAINT "_UserDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
