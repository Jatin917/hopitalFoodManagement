import express from 'express'
import { createDietChart, createMeal, deleteDietChart, getAllDietCharts, getSingleDietChart, updateDietChart } from '../../controller/FootManagement/foodManagementController.js';

const foodManagementRouter = express.Router();

foodManagementRouter.post('/', createDietChart);
foodManagementRouter.get('/:id', getAllDietCharts);
foodManagementRouter.get('/', getSingleDietChart);
foodManagementRouter.put('/:id', updateDietChart);
foodManagementRouter.delete('/:id', deleteDietChart);
foodManagementRouter.post('/createmeal', createMeal);

export default foodManagementRouter