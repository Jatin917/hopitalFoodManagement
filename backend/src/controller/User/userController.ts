import { prisma } from "../../server";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../../utils/statusCode";
import jwt from 'jsonwebtoken'

enum Role {
    ADMIN="ADMIN",
    PANTRY_STAFF="PANTRY_STAFF",
    DELIVERY_PERSONNEL="DELIVERY_PERSONNEL"
}
interface userType {
    name:string,
    email:string,
    password:string,
    role:Role,
    contactInfo?: string
    assignedTasks: string[]
    deliveryTasks: string[]
    Pantry?:number
    mealTrackingDelivery: string[]
    mealTrackingPantry: string[]
}

const SECRET_KEY = process.env.SECRET_KEY_JWT || "";

export const userSignUp = async (req: any, res:any) =>{
    try {
        const user = req.body as userType
        const {name, email, password, role, contactInfo} = user;
        const response = await prisma.user.create({
            data:{name, email, password, role, contactInfo }
        });
        if(!response){
            return res.status(BAD_REQUEST).json({message:"Please Try again"});
        }
        const id = String(response.id);
        const token = jwt.sign(id, SECRET_KEY);
        return res.status(CREATED).json({token:token});
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}

export const userSignIn = async (req:any, res:any) =>{
    try {
        const user = req.body as userType;
        const {email, password, role} = user;
        const userExist = await prisma.user.findUnique({
            where:{
                email,
                password,
                role
            }
        });
        if(!userExist){
            return res.status(NOT_FOUND).json({message:"Please create an account to continue"});
        }
        const id = String(userExist.id);
        const token = jwt.sign(id, SECRET_KEY);
        return res.status(OK).json({token:token});
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}