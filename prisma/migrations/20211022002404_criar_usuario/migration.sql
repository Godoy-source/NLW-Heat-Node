/*
  Warnings:

  - You are about to drop the column `name` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `nome` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "github_id" INTEGER NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "login" TEXT NOT NULL
);
INSERT INTO "new_usuarios" ("avatar_url", "github_id", "id", "login") SELECT "avatar_url", "github_id", "id", "login" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
