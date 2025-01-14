import { prisma } from "../../server.js";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT, NOT_FOUND, OK } from "../../utils/statusCode.js";
import { PatientSchema, PatientType } from "../../utils/typesDefinition.js";
import { z } from "zod";

export const createPatient = async (req:any, res:any) =>{
    try {
        const result = PatientSchema.safeParse(req.body);
        if(!result.success){
          return res.status(BAD_REQUEST).json({message:"Validation of Data Error"}); 
        }
        const {
          name, diseases, allergies, roomNumber, bedNumber, floorNumber,
          age, gender, contactInfo, emergencyContact
        } = result.data;
        const newPatient = await prisma.patient.create({
          data: {
            name,
            diseases,
            allergies,
            roomNumber,
            bedNumber,
            floorNumber,
            age,
            gender,
            contactInfo,
            emergencyContact,
          },
        });
    
        res.status(CREATED).json(newPatient);
      } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to create patient.' });
      }
}

export const getPatients = async (req:any, res:any) => {
    try {
      const patients: PatientType[] = await prisma.patient.findMany();
      return res.status(OK).json(patients);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch patients.' });
    }
  };
  
export const getPatient =  async (req:any, res:any) => {
    try {
      const patient: (PatientType | null) = await prisma.patient.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!patient) {
        return res.status(NOT_FOUND).json({ error: 'Patient not found.' });
      }
  
      return res.status(OK).json(patient);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch patient.' });
    }
  };

export const updatePatientDetail = async (req:any, res:any) => {
    try {
      const result = PatientSchema.safeParse(req.body);
      if(!result.success){
        return res.status(BAD_REQUEST).json({message:"Validation of Data Error"}); 
      }
      const {
        name, diseases, allergies, roomNumber, bedNumber, floorNumber,
        age, gender, contactInfo, emergencyContact, 
      } = result.data;
      const updatedPatient = await prisma.patient.update({
        where: { id: parseInt(req.params.id) },
        data: {
          name,
          diseases,
          allergies,
          roomNumber,
          bedNumber,
          floorNumber,
          age,
          gender,
          contactInfo,
          emergencyContact,
        },
      });
  
      res.status(OK).json(updatedPatient);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to update patient.' });
    }
  };
  

export const deletePatient = async (req:any, res:any) => {
    try {
      await prisma.patient.delete({
        where: { id: parseInt(req.params.id) },
      });
  
      res.status(NO_CONTENT).send();
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete patient.' });
    }
  };
