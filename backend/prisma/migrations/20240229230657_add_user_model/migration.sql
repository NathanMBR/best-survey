-- CreateTable
CREATE TABLE "User" (
    "internalId" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "User_pkey" PRIMARY KEY ("internalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
