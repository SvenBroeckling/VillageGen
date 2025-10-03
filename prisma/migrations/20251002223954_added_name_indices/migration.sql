-- CreateIndex
CREATE INDEX "FemaleFirstName_name_idx" ON "FemaleFirstName" USING HASH ("name");

-- CreateIndex
CREATE INDEX "LastName_name_idx" ON "LastName" USING HASH ("name");

-- CreateIndex
CREATE INDEX "MaleFirstName_name_idx" ON "MaleFirstName" USING HASH ("name");
