-- CreateTable
CREATE TABLE "NFT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner" TEXT NOT NULL,
    "ipfs" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "pubkey" TEXT NOT NULL,
    "account" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "owner" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NFT.owner_unique" ON "NFT"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "User.nickname_unique" ON "User"("nickname");
