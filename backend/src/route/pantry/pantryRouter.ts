import express from "express";
import { addStaffMemberController, createPantryController } from "../../controller/Pantry/pantryController";
import { pantryAdminMiddleware } from "../../middleware/auth";

const pantryRouter = express.Router();

pantryRouter.post('/addpantry', pantryAdminMiddleware, createPantryController);
pantryRouter.put('/addstaff/', pantryAdminMiddleware, addStaffMemberController);

export default pantryRouter