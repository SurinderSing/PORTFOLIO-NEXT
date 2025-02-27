/*
  Warnings:

  - You are about to drop the column `rememberToken` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[verificationToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `rememberToken`,
    ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `verificationToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_verificationToken_key` ON `User`(`verificationToken`);
