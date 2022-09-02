/*
  Warnings:

  - A unique constraint covering the columns `[membershipId,roleId]` on the table `MembershipRole` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MembershipRole_membershipId_roleId_key" ON "MembershipRole"("membershipId", "roleId");
