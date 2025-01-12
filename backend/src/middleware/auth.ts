import jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '../utils/statusCode';

interface RESULT_PAYLOAD  {
    id:string
}

const authMiddleware = (req: any, res: any, next: any) =>{
    try {
        const SECRET_KEY = process.env.SECRET_KEY_JWT || "";
        const token = req.headers.authorization.split(" ")[1];
        const result = jwt.verify(token, SECRET_KEY) as RESULT_PAYLOAD;
        if(!result){
            return res.status(UNAUTHORIZED).json({message:"User not found"});
        }
        req.userId = result.id;
    } catch (error) {
        console.log((error as Error).message);
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}