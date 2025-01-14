import express from "express";
import { addStaffMemberController, assignMealBoxToDeliveryPersonnel, assignTask, changeMealStatusDelivery, changeMealStatusPantry, createPantryController, getDeliveryPersonnel, getPantryStaff, getPantryTaskController, MealTrackingController } from "../../controller/Pantry/pantryController.js";
import { authMiddleware, pantryAdminMiddleware, pantryStaffMiddleware, deliveryStaffMiddleware } from "../../middleware/auth.js";

const pantryRouter = express.Router();

pantryRouter.post('/addpantry',authMiddleware, pantryAdminMiddleware, createPantryController);
pantryRouter.put('/addstaff',authMiddleware, pantryAdminMiddleware, addStaffMemberController);
pantryRouter.post('/assignPantryTask',authMiddleware, pantryAdminMiddleware, assignTask);
pantryRouter.post('/assignDeliveryTask',authMiddleware, pantryStaffMiddleware, assignMealBoxToDeliveryPersonnel);
pantryRouter.put('/changeStatusPantry',authMiddleware, pantryStaffMiddleware, changeMealStatusPantry);
pantryRouter.put('/changeStatusDelivery',authMiddleware, deliveryStaffMiddleware, changeMealStatusDelivery);
pantryRouter.get('/getPantryStaff', getPantryStaff);
pantryRouter.get('/getDeliveryPerson', getDeliveryPersonnel);
pantryRouter.get('/getMealTracking', MealTrackingController);
pantryRouter.get('/getPantryTask', getPantryTaskController);
export default pantryRouter