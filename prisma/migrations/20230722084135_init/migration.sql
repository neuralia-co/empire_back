-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedById" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "url" TEXT NOT NULL,
    "pretaxValue" DOUBLE PRECISION NOT NULL,
    "VAT" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnCompanies" (
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnCompanies_pkey" PRIMARY KEY ("userId","companyId")
);

-- CreateTable
CREATE TABLE "InvoicesOnCompanies" (
    "invoiceId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "debit" BOOLEAN NOT NULL,

    CONSTRAINT "InvoicesOnCompanies_pkey" PRIMARY KEY ("invoiceId","companyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_siren_key" ON "Company"("siren");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCompanies" ADD CONSTRAINT "UsersOnCompanies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCompanies" ADD CONSTRAINT "UsersOnCompanies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicesOnCompanies" ADD CONSTRAINT "InvoicesOnCompanies_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicesOnCompanies" ADD CONSTRAINT "InvoicesOnCompanies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
