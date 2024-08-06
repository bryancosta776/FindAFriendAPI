/*
  Warnings:

  - You are about to drop the column `number` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `WhatsApp` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "number",
ADD COLUMN     "WhatsApp" TEXT NOT NULL,
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL;
