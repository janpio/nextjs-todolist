-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "optionId" SERIAL NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "settingTime" TEXT NOT NULL DEFAULT '24:00',
    "todoId" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("optionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Option_todoId_key" ON "Option"("todoId");

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
