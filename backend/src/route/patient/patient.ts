import express from 'express'
import { createPatient, deletePatient, getPatient, getPatients, updatePatientDetail } from '../../controller/Patient/patientController.js';
import { authMiddleware } from '../../middleware/auth.js';
const patientRouter = express.Router();

patientRouter.post('/',authMiddleware, createPatient);
patientRouter.get('/:id', getPatient);
patientRouter.get('/', getPatients);
patientRouter.put('/:id',authMiddleware, updatePatientDetail);
patientRouter.delete('/:id',authMiddleware, deletePatient);

export default patientRouter