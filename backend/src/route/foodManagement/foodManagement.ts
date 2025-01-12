import express from 'express'
import { createDietChart, deleteDietChart, getAllDietCharts, getSingleDietChart, updateDietChart } from '../../controller/FootManagement/foodManagementController';

const foodManagementRouter = express.Router();

foodManagementRouter.post('/', createDietChart);
foodManagementRouter.get('/:id', getAllDietCharts);
foodManagementRouter.get('/', getSingleDietChart);
foodManagementRouter.put('/:id', updateDietChart);
foodManagementRouter.delete('/:id', deleteDietChart);

export default foodManagementRouter