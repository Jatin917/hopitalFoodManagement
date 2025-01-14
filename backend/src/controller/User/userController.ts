import { prisma } from "../../server.js";
import { BAD_REQUEST, CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../../utils/statusCode.js";
import jwt from 'jsonwebtoken'
import { SignInSchema, SignUpSchema, UserSchema, UserType } from "../../utils/typesDefinition.js";
import { any } from "zod";


const SECRET_KEY = process.env.SECRET_KEY_JWT || "hellojattu";

export const userSignUp = async (req: any, res:any) =>{
    try {
        const result = SignUpSchema.safeParse(req.body);
        if(!result.success){
            return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
        }
        const user = result.data;
        const {name, email, password, role, contactInfo} = user;
        const userExist: (UserType | null) = await prisma.user.findUnique({
            where:{
                email,
                password,
                role
            }
        });
        if(userExist){
            return res.status(CONFLICT).json({message:"User Already Exist"});
        }
        const response = await prisma.user.create({
            data:{name, email, password, role, contactInfo }
        });
        if(!response){
            return res.status(BAD_REQUEST).json({message:"Please Try again"});
        }
        const id = String(response.id);
        const token = jwt.sign({id:id}, SECRET_KEY);
        return res.status(CREATED).json({token:token});
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}

export const userSignIn = async (req:any, res:any) =>{
    try {
        const result = SignInSchema.safeParse(req.body);
        if(!result.success){
            return res.status(BAD_REQUEST).json({message:"Validation of Data Error"});
        }
        const user = result.data;
        const {email, password, role} = user;
        const userExist: (UserType | null) = await prisma.user.findUnique({
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
        const token = jwt.sign({id:id}, SECRET_KEY);
        return res.status(OK).json({token:token});
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}

export const getAllUser = async (req:any, res:any)=>{
    try {
        const users = await prisma.user.findMany();
        return res.status(OK).json(users);
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
}