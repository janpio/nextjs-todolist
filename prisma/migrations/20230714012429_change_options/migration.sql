/*
  Warnings:

  - You are about to drop the column `priority` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `settingTime` on the `Todo` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Option" (
    "optionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "settingTime" TEXT NOT NULL DEFAULT '24:00',
    "todoId" INTEGER NOT NULL,
    CONSTRAINT "Option_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Todo" ("completed", "createdAt", "id", "title", "updatedAt") SELECT "completed", "createdAt", "id", "title", "updatedAt" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Option_todoId_key" ON "Option"("todoId");
