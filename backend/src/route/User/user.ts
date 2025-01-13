import express from 'express'
import { getAllUser, userSignIn, userSignUp } from '../../controller/User/userController';

const userRouter = express.Router();
userRouter.post('/signup', userSignUp);
userRouter.post('/signin', userSignIn);
userRouter.get("/getAllUser", getAllUser)

export default userRouter