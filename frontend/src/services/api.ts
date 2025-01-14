import axios from "axios";
import { signInType, signUpType } from "../utils/typeDefinition"

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: API_URL,
});

export const signUpUser = async (data:signUpType) =>{
    try {
        const response = await api.post("/user/signup", data);
        if(!response){
            return {success:false, message:"Failed to Signup"};
        }
        return {success:true, message:response.data.message, data:response.data};
    } catch (error) {
        console.log((error as Error).message)
    }
}
export const signinUser = async (data:signInType) =>{
    try {
        const response = await api.post("/user/signin", data);
        if(!response) return {success:false, message:"Failed to Signup"};
        return {success:true, message:response.data.message, data:response.data};
    } catch (error) {
        console.log((error as Error).message)
    }
}