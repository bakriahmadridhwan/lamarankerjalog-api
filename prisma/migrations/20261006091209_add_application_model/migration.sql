/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `applications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(100) NOT NULL,
    `job_title` VARCHAR(100) NOT NULL,
    `location` VARCHAR(100) NULL,
    `link` VARCHAR(500) NULL,
    `application_date` DATE NOT NULL,
    `status` ENUM('applied', 'screening', 'interview', 'offer', 'accepted', 'rejected', 'withdrawn') NOT NULL DEFAULT 'applied',
    `notes` TEXT NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_token_key` ON `users`(`token`);

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
