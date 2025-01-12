import express from 'express'
import { createPatient, deletePatient, getPatient, getPatients, updatePatientDetail } from '../../controller/Patient/patientController';
const patientRouter = express.Router();

patientRouter.post('/', createPatient);
patientRouter.get('/:id', getPatient);
patientRouter.get('/', getPatients);
patientRouter.put('/:id', updatePatientDetail);
patientRouter.delete('/:id', deletePatient);

export default patientRouter