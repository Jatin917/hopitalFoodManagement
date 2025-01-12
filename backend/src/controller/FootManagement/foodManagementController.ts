import { prisma } from "../../server";
import { CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT, OK } from "../../utils/statusCode";


export const createDietChart = async (req:any, res:any) => {
    try {
      const { patientId, morningMealId, eveningMealId, nightMealId } = req.body;
  
      const newDietChart = await prisma.dietChart.create({
        data: {
          patientId,
          morningMealId,
          eveningMealId,
          nightMealId,
        },
      });
  
      res.status(CREATED).json(newDietChart);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to create diet chart.' });
    }
  };
  
export const getAllDietCharts =  async (req:any, res:any) => {
    try {
      const dietCharts = await prisma.dietChart.findMany({
        include: { patient: true, morningMeal: true, eveningMeal: true, nightMeal: true },
      });
  
      res.status(OK).json(dietCharts);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch diet charts.' });
    }
  };
  
export const getSingleDietChart =  async (req:any, res:any) => {
    try {
      const dietChart = await prisma.dietChart.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { patient: true, morningMeal: true, eveningMeal: true, nightMeal: true },
      });
  
      if (!dietChart) {
        return res.status(404).json({ error: 'Diet chart not found.' });
      }
  
      res.status(OK).json(dietChart);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch diet chart.' });
    }
  };
  
export const updateDietChart =  async (req:any, res:any) => {
    try {
      const { morningMealId, eveningMealId, nightMealId } = req.body;
  
      const updatedDietChart = await prisma.dietChart.update({
        where: { id: parseInt(req.params.id) },
        data: {
          morningMealId,
          eveningMealId,
          nightMealId,
        },
      });
  
      res.status(OK).json(updatedDietChart);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to update diet chart.' });
    }
  };

export const deleteDietChart =  async (req:any, res:any) => {
    try {
      await prisma.dietChart.delete({
        where: { id: parseInt(req.params.id) },
      });
  
      res.status(NO_CONTENT).send();
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete diet chart.' });
    }
  };
  