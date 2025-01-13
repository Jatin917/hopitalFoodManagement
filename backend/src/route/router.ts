import express from 'express'
import patientRouter from './patient/patient';
import foodManagementRouter from './foodManagement/foodManagement';
import { authMiddleware } from '../middleware/auth';
import userRouter from './User/user';
import pantryRouter from './pantry/pantryRouter';

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Backend is running");
})
router.use('/patients', authMiddleware, patientRouter);
router.use('/diet-charts',authMiddleware, foodManagementRouter);
router.use('/user', userRouter);
router.use('/pantry',authMiddleware, pantryRouter);
export default router;