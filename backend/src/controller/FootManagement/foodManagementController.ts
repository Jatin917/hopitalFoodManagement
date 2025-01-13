import { prisma } from "../../server";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT, NOT_FOUND, OK } from "../../utils/statusCode";
import { DietChartSchema, DietChartType, MealSchema, MealType } from "../../utils/typesDefinition";
import z from 'zod'

export const createDietChart = async (req:any, res:any) => {
    try {
      const dietChart = DietChartSchema.safeParse(req.body);
      if(!dietChart.success){
        return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
      }
      const { patientId, morningMealId, eveningMealId, nightMealId } = dietChart.data;
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
      const dietCharts: (DietChartType[] | null) = await prisma.dietChart.findMany({
        include: { patient: true, morningMeal: true, eveningMeal: true, nightMeal: true },
      }) ;
      res.status(OK).json(dietCharts);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch diet charts.' });
    }
  };
  
export const getSingleDietChart =  async (req:any, res:any) => {
    try {
      const dietChart: (DietChartType | null) = await prisma.dietChart.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { patient: true, morningMeal: true, eveningMeal: true, nightMeal: true },
      });
      if (!dietChart) {
        return res.status(NOT_FOUND).json({ error: 'Diet chart not found.' });
      }
      res.status(OK).json(dietChart);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch diet chart.' });
    }
  };
  
export const updateDietChart =  async (req:any, res:any) => {
    try {
      const result = DietChartSchema.safeParse(req.body);
      if(!result.success){
        return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
      }
      const { morningMealId, eveningMealId, nightMealId } = result.data
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
  
  export const createMeal = async (req:any, res:any) =>{
    try {
      const result = MealSchema.safeParse(req.body);
      if(!result.success){
        return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
      }
      const meal = result.data
      const {ingredients, instructions, mealType} = meal;
      const response = await prisma.meal.create({data:{ingredients, instructions, mealType}});
      if(!response){
        return res.status(BAD_REQUEST).json({message:"Please Try Again"});
      }
      return res.status(CREATED).json({message:"Created Successfully"});
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete diet chart.' });
  }
}