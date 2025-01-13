/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `DeliveryTask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `DietChart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `MealTracking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Pantry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PantryTask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DeliveryTask_id_key" ON "DeliveryTask"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DietChart_id_key" ON "DietChart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Meal_id_key" ON "Meal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MealTracking_id_key" ON "MealTracking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pantry_id_key" ON "Pantry"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PantryTask_id_key" ON "PantryTask"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_id_key" ON "Patient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
