import express from 'express'
import patientRouter from './patient/patient.js';
import foodManagementRouter from './foodManagement/foodManagement.js';
import { authMiddleware } from '../middleware/auth.js';
import userRouter from './User/user.js';
import pantryRouter from './pantry/pantryRouter.js';

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Backend is running");
})
router.use('/patients', patientRouter);
router.use('/diet-charts',authMiddleware, foodManagementRouter);
router.use('/user', userRouter);
router.use('/pantry', pantryRouter);
export default router;