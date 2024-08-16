/*
  Warnings:

  - Added the required column `version_name` to the `song_version` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "song_version" ADD COLUMN     "version_name" TEXT NOT NULL;
