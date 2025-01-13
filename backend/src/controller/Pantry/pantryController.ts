import { prisma } from "../../server";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "../../utils/statusCode";
import { PantrySchema, PantryStaffSchema, PantryStaffType, PantryType, UserSchema } from "../../utils/typesDefinition";

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
        const pantry = await prisma.pantry.findUnique({
            where: { id: pantryId },
          }) as PantryType;
          
          if (pantry && pantry.staff) {
            const updatedPantry = await prisma.pantry.update({
              where: { id: pantryId },
              data: {
                staff: {
                  set: [...pantry.staff, pantryStaffData],
                },
              },
            });
            if(updatedPantry){
              return res.status(CREATED).json({message:"Successfully updated Pantry"});
            }
          }
          return res.status(BAD_REQUEST).JSON({message:"Please Try Again"})
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})    
    }
}