-- CreateTable
CREATE TABLE "Lens" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Lens_pkey" PRIMARY KEY ("id")
);
