import express from "express";
import { addStaffMemberController, assignMealBoxToDeliveryPersonnel, assignTask, changeMealStatusDelivery, changeMealStatusPantry, createPantryController } from "../../controller/Pantry/pantryController";
import { authMiddleware, pantryAdminMiddleware, pantryStaffMiddleware, deliveryStaffMiddleware } from "../../middleware/auth";

const pantryRouter = express.Router();

pantryRouter.post('/addpantry',authMiddleware, pantryAdminMiddleware, createPantryController);
pantryRouter.put('/addstaff',authMiddleware, pantryAdminMiddleware, addStaffMemberController);
pantryRouter.post('/assignPantryTask',authMiddleware, pantryAdminMiddleware, assignTask);
pantryRouter.post('/assignDeliveryTask',authMiddleware, pantryStaffMiddleware, assignMealBoxToDeliveryPersonnel);
pantryRouter.put('/changeStatusPantry',authMiddleware, pantryStaffMiddleware, changeMealStatusPantry);
pantryRouter.put('/changeStatusDelivery',authMiddleware, deliveryStaffMiddleware, changeMealStatusDelivery);

export default pantryRouter