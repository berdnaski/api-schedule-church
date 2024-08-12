-- CreateTable
CREATE TABLE "_UserSchedules" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserSchedules_AB_unique" ON "_UserSchedules"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSchedules_B_index" ON "_UserSchedules"("B");

-- AddForeignKey
ALTER TABLE "_UserSchedules" ADD CONSTRAINT "_UserSchedules_A_fkey" FOREIGN KEY ("A") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSchedules" ADD CONSTRAINT "_UserSchedules_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
