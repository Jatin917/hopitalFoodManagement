import axios from "axios";
import { PatientType, signInType, signUpType } from "../utils/typeDefinition"

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

export const getPatients = async () =>{
    try {
        const response = await api.get('/patients');
        if(!response) return {success:false, message:"Failed to Fetch Data"};
        return {success:true, message:response.data.message, data:response.data};
    } catch (error) {
        console.log((error as Error).message)
    }
}
export const createPatient = async (data: PatientType) => {
    try {
        const token = localStorage.getItem('token');  // Retrieve the token from storage
        if (!token) {
            return { success: false, message: "Authorization token not found." };
        }

        const response = await api.post('/patients', data, {
            headers: {
                Authorization: `Bearer ${token}`  // Add the token to the Authorization header
            }
        });

        if (!response) {
            return { success: false, message: "Failed to Submit Data" };
        }

        return { success: true, message: response.data.message, data: response.data };
    } catch (error) {
        console.error((error as Error).message);
        return { success: false, message: "An error occurred." };
    }
};


export const getPantryStaff = async () =>{
    try {
        const response = await api.get('/pantry/getPantryStaff');
            if(!response) return {success:false, message:"Cannot Fetched Data"};
        return {success:true, message:response.data.message, data:response.data.data}
    } catch (error) {
        console.error((error as Error).message);
        return { success: false, message: "An error occurred." };
    }
}