-- CreateTable
CREATE TABLE "mensagens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_ID" TEXT NOT NULL,
    CONSTRAINT "mensagens_usuario_ID_fkey" FOREIGN KEY ("usuario_ID") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
