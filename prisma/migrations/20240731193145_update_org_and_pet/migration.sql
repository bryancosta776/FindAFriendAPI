/*
  Warnings:

  - You are about to drop the column `role` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `sized` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "sized";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Sized";
