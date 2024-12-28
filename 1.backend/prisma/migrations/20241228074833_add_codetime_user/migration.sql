/*
  Warnings:

  - Added the required column `CodeExpired` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CodeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "CodeExpired" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "CodeId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
