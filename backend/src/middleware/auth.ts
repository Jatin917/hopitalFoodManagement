import jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR, NO_CONTENT, OK, UNAUTHORIZED } from '../utils/statusCode';
import { prisma } from '../server';

interface RESULT_PAYLOAD  {
    id:string
}

export const authMiddleware = (req: any, res: any, next: any) =>{
    try {
        const SECRET_KEY = process.env.SECRET_KEY_JWT || "";
        const token = req.headers.authorization.split(" ")[1];
        const result = jwt.verify(token, SECRET_KEY) as RESULT_PAYLOAD;
        if(!result){
            return res.status(UNAUTHORIZED).json({message:"User not found"});
        }
        req.userId = result.id;
        next();
    } catch (error) {
        console.log((error as Error).message);
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}
export const pantryAdminMiddleware = async(req: any, res: any, next: any) =>{
    try {
        const id = req.userId;
        const userIsAdmin = await prisma.user.findUnique({
            where:{
                id
            }
        });
        if(!userIsAdmin){
            return res.status(NO_CONTENT).json({message:"User not found"});
        }
        if(userIsAdmin.role!=="ADMIN"){
            return res.status(UNAUTHORIZED).json({message:"Admin only can proceed"});
        }
        next();
    } catch (error) {
        console.log((error as Error).message);
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}