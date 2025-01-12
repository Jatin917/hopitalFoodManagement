-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PANTRY_STAFF', 'DELIVERY_PERSONNEL');

-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('MORNING', 'EVENING', 'NIGHT');

-- CreateEnum
CREATE TYPE "MealStatus" AS ENUM ('NOT_ASSIGNED', 'PENDING', 'IN_PREPARATION', 'READY_FOR_DELIVERY', 'DELIVERED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "contactInfo" TEXT,
    "Pantryid" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "diseases" TEXT[],
    "allergies" TEXT[],
    "roomNumber" TEXT NOT NULL,
    "bedNumber" TEXT NOT NULL,
    "floorNumber" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "otherDetails" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DietChart" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "morningMealId" INTEGER NOT NULL,
    "eveningMealId" INTEGER NOT NULL,
    "nightMealId" INTEGER NOT NULL,

    CONSTRAINT "DietChart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT,
    "mealType" "MealType" NOT NULL,
    "status" "MealStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pantry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Pantry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PantryTask" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "mealId" INTEGER NOT NULL,
    "status" "MealStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PantryTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryTask" (
    "id" SERIAL NOT NULL,
    "deliveryPersonId" INTEGER NOT NULL,
    "mealId" INTEGER NOT NULL,
    "status" "MealStatus" NOT NULL DEFAULT 'READY_FOR_DELIVERY',
    "deliveredAt" TIMESTAMP(3),
    "deliveryNotes" TEXT,

    CONSTRAINT "DeliveryTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealTracking" (
    "id" SERIAL NOT NULL,
    "mealId" INTEGER,
    "patientId" INTEGER,
    "roomNumber" TEXT NOT NULL,
    "status" "MealStatus" NOT NULL DEFAULT 'NOT_ASSIGNED',
    "pantryStaffId" INTEGER,
    "deliveryPersonId" INTEGER,
    "preparedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "deliveryNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealTracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DietChart_patientId_key" ON "DietChart"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "DietChart_morningMealId_key" ON "DietChart"("morningMealId");

-- CreateIndex
CREATE UNIQUE INDEX "DietChart_eveningMealId_key" ON "DietChart"("eveningMealId");

-- CreateIndex
CREATE UNIQUE INDEX "DietChart_nightMealId_key" ON "DietChart"("nightMealId");

-- CreateIndex
CREATE UNIQUE INDEX "PantryTask_mealId_key" ON "PantryTask"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryTask_mealId_key" ON "DeliveryTask"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "MealTracking_mealId_key" ON "MealTracking"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "MealTracking_patientId_key" ON "MealTracking"("patientId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_Pantryid_fkey" FOREIGN KEY ("Pantryid") REFERENCES "Pantry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_morningMealId_fkey" FOREIGN KEY ("morningMealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_eveningMealId_fkey" FOREIGN KEY ("eveningMealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_nightMealId_fkey" FOREIGN KEY ("nightMealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryTask" ADD CONSTRAINT "PantryTask_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryTask" ADD CONSTRAINT "PantryTask_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryTask" ADD CONSTRAINT "DeliveryTask_deliveryPersonId_fkey" FOREIGN KEY ("deliveryPersonId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryTask" ADD CONSTRAINT "DeliveryTask_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealTracking" ADD CONSTRAINT "MealTracking_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealTracking" ADD CONSTRAINT "MealTracking_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealTracking" ADD CONSTRAINT "MealTracking_pantryStaffId_fkey" FOREIGN KEY ("pantryStaffId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealTracking" ADD CONSTRAINT "MealTracking_deliveryPersonId_fkey" FOREIGN KEY ("deliveryPersonId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
