import jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR, NO_CONTENT, OK, UNAUTHORIZED } from '../utils/statusCode.js';
import { prisma } from '../server.js';

interface RESULT_PAYLOAD  {
    id:string
}

export const authMiddleware = (req: any, res: any, next: any) =>{
    try {
        const SECRET_KEY = process.env.SECRET_KEY_JWT || "hellojattu";
        const token = req.headers.authorization.split(" ")[1];
        const result = jwt.verify(token, SECRET_KEY) as RESULT_PAYLOAD;
        if(!result){
            return res.status(UNAUTHORIZED).json({message:"User not found"});
        }
        console.log(result);
        req.userId = result.id;
        console.log("auth done");
        next();
    } catch (error) {
        console.log((error as Error).message);
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}
export const pantryAdminMiddleware = async(req: any, res: any, next: any) =>{
    try {
        const id = parseInt(req.userId);
        // console.log(id);
        const userIsAdmin = await prisma.user.findUnique({
            where:{
                id:id
            }
        });
        if(!userIsAdmin){
            return res.status(NO_CONTENT).json({message:"User not found"});
        }
        if(userIsAdmin.role!=="ADMIN"){
            return res.status(UNAUTHORIZED).json({message:"Admin only can proceed"});
        }
        console.log("admin done");
        next();
    } catch (error) {
        console.log((error as Error).message);
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}
export const pantryStaffMiddleware = async(req: any, res: any, next: any) =>{
    try {
        const id = parseInt(req.userId);
        // console.log(id);
        const userIsAdmin = await prisma.user.findUnique({
            where:{
                id:id
            }
        });
        if(!userIsAdmin){
            return res.status(NO_CONTENT).json({message:"User not found"});
        }
        if(userIsAdmin.role!=="PANTRY_STAFF"){
            return res.status(UNAUTHORIZED).json({message:"PANTRY_STAFF only can proceed"});
        }
        // console.log("admin done");
        next();
    } catch (error) {
        console.log((error as Error).message);
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}
export const deliveryStaffMiddleware = async(req: any, res: any, next: any) =>{
    try {
        const id = parseInt(req.userId);
        // console.log(id);
        const userIsDelivery = await prisma.user.findUnique({
            where:{
                id:id
            }
        });
        if(!userIsDelivery){
            return res.status(NO_CONTENT).json({message:"User not found"});
        }
        if(userIsDelivery.role!=="DELIVERY_PERSONNEL"){
            return res.status(UNAUTHORIZED).json({message:"Delivery Person only can proceed"});
        }
        // console.log("admin done");
        next();
    } catch (error) {
        console.log((error as Error).message);
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}