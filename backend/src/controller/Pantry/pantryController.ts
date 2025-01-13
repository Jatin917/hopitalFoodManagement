import { prisma } from "../../server";
import { BAD_REQUEST, CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "../../utils/statusCode";
import { DeliveryTaskSchema, MealStatusEnum, MealStatusType, PantrySchema, PantryStaffSchema, PantryStaffType, PantryTaskSchema, PantryType, UserSchema } from "../../utils/typesDefinition";

export const createPantryController = async(req:any, res:any) =>{
    try {
        const result = PantrySchema.safeParse(req.body);
        if(!result.success){
            return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
        }
        const pantry = result.data;
        const {name, contactInfo, location} = pantry
        const response = await prisma.pantry.create({data:{name, contactInfo, location}});
        if(!response){
            return res.status(BAD_REQUEST).json({message:"Error creating pantry"});
        }
        return res.status(OK).json({message:"Created Pantry Successfully"});
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}

export const addStaffMemberController = async (req:any, res:any) =>{
    try {
        const pantryId = req.query.pantryId;
        console.log("pantryid ", pantryId)
        const result = PantryStaffSchema.safeParse(req.body);
        if(!result.success){
            return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
        }
        const pantryStaffData = result.data;
        const {email, role} = pantryStaffData;
        const userExist = await prisma.user.findUnique({
          where:{
            email,
            role
          }
        });
        if(!userExist){
          return res.status(NOT_FOUND).json({message:"Staff Member should have an account"});
        }
        const updatedPantry = await prisma.pantry.update({
          where: { id: parseInt(pantryId) },
          data: {
            staff: {
              connect: [
                { id: userExist.id }, // Connect an existing user by their ID
              ],
            },
          },
        });
        
        if (updatedPantry) {
          return res.status(CREATED).json({  message: "Successfully updated Pantry" });
        }
          return res.status(BAD_REQUEST).json({message:"Please Try Again"})
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})    
    }
}

export const assignTask = async (req:any, res:any) =>{
  try {
    const result = PantryTaskSchema.safeParse(req.body);
    if(!result.success){
      return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
    }
    const {staffId, mealId} = result.data;
    const userExist = await prisma.user.findUnique({
      where:{
        id:staffId
      }
    });
    if(!userExist || userExist.role!=="PANTRY_STAFF"){
      return res.status(CONFLICT).json({message:"staff member should have an account"});
    }
    const response = await prisma.pantryTask.create({
      data:{
        staffId,
        mealId
      },
      include:{
        staff:true,
        meal:true
      }
    });
    if(!response){
      return res.status(BAD_REQUEST).json({message:"Please Try Again"})
    };
    return res.status(CREATED).json({data:response, message:"Successfully assigned task"})
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})    
  }
}


export const changeMealStatusPantry = async (req:any, res:any) =>{
  try {
    const mealId = parseInt(req.query.mealId);
    const result = req.body.status as MealStatusType;
    if(!result){
      return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
    }
    const status = result;
    const responsePantryTask = await prisma.pantryTask.update({
      where:{
        mealId
      },
      data:{
        status
      }
    });
    if(!responsePantryTask){
      return res.status(BAD_REQUEST).json({message:"please try again"});
    }
    return res.status(OK).json({message:"updated status successfully", data:responsePantryTask});
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})    
  }
}
export const changeMealStatusDelivery = async (req:any, res:any) =>{
  try {
    const mealId = parseInt(req.query.mealId);
    const result = req.body.status as MealStatusType;
    if(!result){
      return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
    }
    const status = result;
    const responseDeliveryTask = await prisma.deliveryTask.update({
      where:{
        mealId
      },
      data:{
        status
      }
    });
    if(!responseDeliveryTask){
      return res.status(BAD_REQUEST).json({message:"please try again"});
    }
    return res.status(OK).json({message:"updated status successfully", data:responseDeliveryTask});
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})    
  }
}

export const assignMealBoxToDeliveryPersonnel = async(req:any, res:any) =>{
  try {
    const result = DeliveryTaskSchema.safeParse(req.body);
    console.log(result)
    if(!result.success){
      return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
    }
    const {deliveryPersonId, mealId} = result.data;
    const userExist = await prisma.user.findUnique({
      where:{
        id:deliveryPersonId
      }
    });
    if(!userExist || userExist.role!=="DELIVERY_PERSONNEL"){
      return res.status(CONFLICT).json({message:"Delivery Person should have an account or role should be delivery personnel"});
    }
    const response = await prisma.deliveryTask.create({
      data:{
        deliveryPersonId,
        mealId
      }
    });
    if(!response){
      return res.status(BAD_REQUEST).json({message:"please try again"});
    }
    return res.status(CREATED).json({message:"created successfully", data:response});
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})    
  }
}