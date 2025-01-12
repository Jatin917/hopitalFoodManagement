import express from 'express'
import patientRouter from './patient/patient';
import foodManagementRouter from './foodManagement/foodManagement';

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Backend is running");
})
router.use('/patients', patientRouter);
router.use('/diet-charts', foodManagementRouter);
export default router;